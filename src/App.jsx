import { useEffect, useRef } from 'react'
import { CONTACT_EMAIL, projects } from './site.js'

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The logo mark. With `orbit`, a planet travels round the ring, passing behind the A
// on the far side and in front of it on the near side.
function Mark({ size = 40, orbit = false, id = 'm' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (orbit && reducedMotion()) ref.current?.pauseAnimations?.()
  }, [orbit])
  const ring = 'M57.6 32.5 A26 7 -10 0 1 6.4 41.5 A26 7 -10 0 1 57.6 32.5'
  return (
    <svg ref={ref} className="mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B7DFF" />
          <stop offset="1" stopColor="#4B3CF0" />
        </linearGradient>
        <clipPath id={`${id}-near`}>
          <path d="M-10 43.5 L74 28.7 L74 74 L-10 74 Z" />
        </clipPath>
      </defs>
      <path d="M6.4 41.5 A26 7 -10 0 1 57.6 32.5" fill="none" stroke="#F5A524" strokeWidth="3.5" opacity=".5" />
      {orbit && (
        <circle r="3.6" fill="#F5A524">
          <animateMotion dur="7s" repeatCount="indefinite" path={ring} />
        </circle>
      )}
      <path d="M12 55 L32 10 L52 55" fill="none" stroke={`url(#${id}-g)`} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M57.6 32.5 A26 7 -10 0 1 6.4 41.5" fill="none" stroke="#F5A524" strokeWidth="3.5" strokeLinecap="round" />
      {orbit ? (
        <circle r="3.6" fill="#F5A524" clipPath={`url(#${id}-near)`}>
          <animateMotion dur="7s" repeatCount="indefinite" path={ring} />
        </circle>
      ) : (
        <circle cx="50.5" cy="41.2" r="4.4" fill="#F5A524" />
      )}
    </svg>
  )
}

// A slow, twinkling starfield that leans away from the pointer.
function Starfield() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = reducedMotion()
    let stars = []
    let w = 0
    let h = 0
    let frame = 0
    let visible = true
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w * h) / 4200)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.2 + 0.3,
        t: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.08,
      }))
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, w, h)
      pointer.x += (pointer.tx - pointer.x) * 0.04
      pointer.y += (pointer.ty - pointer.y) * 0.04
      for (const s of stars) {
        const drift = still ? 0 : (time * 0.004 * s.z) % w
        let x = s.x - drift - pointer.x * 18 * s.z
        x = ((x % w) + w) % w
        const y = s.y - pointer.y * 18 * s.z
        const a = still ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(time * 0.0012 * s.z + s.t))
        ctx.globalAlpha = a * s.z
        ctx.fillStyle = s.warm ? '#FFC867' : '#E4E6FF'
        ctx.beginPath()
        ctx.arc(x, y, s.r * s.z * 1.4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const loop = (time) => {
      if (visible) draw(time)
      frame = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5
      pointer.ty = e.clientY / window.innerHeight - 0.5
    }

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(canvas)
    resize()
    window.addEventListener('resize', resize)
    if (still) draw(0)
    else {
      window.addEventListener('pointermove', onMove)
      frame = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}

// Reveals each product world as it scrolls in, drifts its screens with the scroll,
// and tilts them toward the pointer.
function useWorldMotion() {
  useEffect(() => {
    const worlds = [...document.querySelectorAll('.world')]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-in')),
      { threshold: 0.25 },
    )
    worlds.forEach((w) => io.observe(w))
    if (reducedMotion()) return () => io.disconnect()

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const vh = window.innerHeight
        for (const w of worlds) {
          const r = w.getBoundingClientRect()
          const p = (r.top + r.height / 2 - vh / 2) / vh
          w.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(3))
        }
      })
    }
    const tilt = (e) => {
      const fan = e.currentTarget
      const r = fan.getBoundingClientRect()
      fan.style.setProperty('--rx', (((e.clientY - r.top) / r.height - 0.5) * -8).toFixed(2) + 'deg')
      fan.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 10).toFixed(2) + 'deg')
    }
    const untilt = (e) => {
      e.currentTarget.style.setProperty('--rx', '0deg')
      e.currentTarget.style.setProperty('--ry', '0deg')
    }
    const fans = [...document.querySelectorAll('.fan')]
    fans.forEach((f) => {
      f.addEventListener('pointermove', tilt)
      f.addEventListener('pointerleave', untilt)
    })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      fans.forEach((f) => {
        f.removeEventListener('pointermove', tilt)
        f.removeEventListener('pointerleave', untilt)
      })
    }
  }, [])
}

function useHeaderState() {
  useEffect(() => {
    const header = document.querySelector('.site-header')
    const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

function World({ p, index }) {
  const host = p.url.replace('https://', '')
  return (
    <section
      className={`world${index % 2 ? ' world-flip' : ''}`}
      id={p.id}
      aria-labelledby={`${p.id}-title`}
      style={{ '--tint': p.color, '--glow': p.glow }}
    >
      <div className="world-text">
        <div className="world-badge">
          <img src={p.icon} alt="" width="56" height="56" loading="lazy" />
          <span>{p.kind}</span>
        </div>
        <h2 id={`${p.id}-title`}>{p.name}</h2>
        <p className="world-tagline">{p.tagline}</p>
        <p className="world-summary">{p.summary}</p>
        <ul className="world-platforms" aria-label="Available on">
          {p.platforms.map((x) => <li key={x}>{x}</li>)}
        </ul>
        <div className="world-actions">
          {p.apk && <a className="button" href={p.apk}>Download APK</a>}
          <a className={p.apk ? 'button button-ghost' : 'button'} href={p.url} target="_blank" rel="noopener">
            Visit {host}
          </a>
        </div>
      </div>
      <div className={`fan fan-${p.shots.length}`}>
        {p.shots.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${p.name} screen ${i + 1}`}
            width="480"
            height="853"
            loading="lazy"
            style={{ '--i': i }}
          />
        ))}
      </div>
    </section>
  )
}

export default function App() {
  useWorldMotion()
  useHeaderState()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Aethar Tech home">
          <Mark size={34} id="hdr" />
          <span>Aethar Tech</span>
        </a>
        <nav aria-label="Main">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <Starfield />
          <div className="hero-inner">
            <div className="hero-mark"><Mark size={420} orbit id="hero" /></div>
            <div className="hero-copy">
              <h1 id="hero-title">
                <span className="rise" style={{ '--d': 0 }}>Aethar Tech</span>
              </h1>
              <p className="hero-sub rise" style={{ '--d': 1 }}>
                Home of Moro, Centium VPN, MyCharacter AI and ZAS.
              </p>
              <p className="hero-lede rise" style={{ '--d': 2 }}>
                We dream up our own products and take each one all the way from the first idea to the phone in your hand.
              </p>
            </div>
          </div>
          <nav className="product-bar rise" style={{ '--d': 3 }} aria-label="Our projects">
            {projects.map((p) => (
              <a key={p.id} href={`#${p.id}`} style={{ '--tint': p.color }}>
                <img src={p.icon} alt="" width="48" height="48" />
                <span>{p.name}</span>
              </a>
            ))}
          </nav>
        </section>

        <div id="projects">
          {projects.map((p, i) => <World key={p.id} p={p} index={i} />)}
        </div>

        <section id="about" className="about" aria-labelledby="about-title">
          <h2 id="about-title">One company, many worlds</h2>
          <p className="about-lede">
            Aethar Tech is an independent technology company. Every product starts as one of our own ideas,
            and we design, build and launch it ourselves. Four are live today, and more are on the way.
          </p>
          <div className="values">
            <div>
              <h3>Made for real phones</h3>
              <p>Our apps keep working on slow or patchy data. ZAS reads lessons offline and works out the sky on the phone itself.</p>
            </div>
            <div>
              <h3>Private by default</h3>
              <p>We collect only what a product needs. Centium keeps no logs, and MyCharacter’s private notes stay with their owner.</p>
            </div>
            <div>
              <h3>Free to start</h3>
              <p>Every product is free to download and use. Moro is free for shoppers, with simple plans for the shops.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <Mark size={64} id="ct" />
          <h2 id="contact-title">Say hello</h2>
          <p>For press, partnerships and careers, write to us. We read every message.</p>
          <a className="button button-halo" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Aethar Tech</p>
        <ul aria-label="Our projects">
          {projects.map((p) => (
            <li key={p.id}><a href={p.url} target="_blank" rel="noopener">{p.name}</a></li>
          ))}
        </ul>
      </footer>
    </>
  )
}

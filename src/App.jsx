import { CONTACT_EMAIL, projects } from './site.js'

function Mark({ size = 40 }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="mark-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5B4BFF" />
          <stop offset="1" stopColor="#2A22C9" />
        </linearGradient>
      </defs>
      <path d="M6.4 41.5 A26 7 -10 0 1 57.6 32.5" fill="none" stroke="#F5A524" strokeWidth="3.5" opacity=".5" />
      <path d="M12 55 L32 10 L52 55" fill="none" stroke="url(#mark-g)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M57.6 32.5 A26 7 -10 0 1 6.4 41.5" fill="none" stroke="#F5A524" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50.5" cy="41.2" r="4.4" fill="#F5A524" stroke="#fff" strokeWidth="1.6" />
    </svg>
  )
}

function Project({ p }) {
  const host = p.url.replace('https://', '')
  return (
    <article className="project" id={p.id} style={{ '--tint': p.color }}>
      <img className="project-icon" src={p.icon} alt={`${p.name} app icon`} width="128" height="128" loading="lazy" />
      <div className="project-body">
        <h3>{p.name}</h3>
        <p className="project-kind">{p.kind}</p>
        <p className="project-summary">{p.summary}</p>
        <ul className="project-features">
          {p.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <dl className="project-meta">
          <div><dt>Runs on</dt><dd>{p.platforms}</dd></div>
          <div><dt>Built with</dt><dd>{p.stack}</dd></div>
        </dl>
        <div className="project-links">
          {p.apk && <a className="project-apk" href={p.apk}>Download APK</a>}
          <a className="project-link" href={p.url} target="_blank" rel="noopener">
            Open {host}
          </a>
        </div>
      </div>
    </article>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Aethar Tech home">
          <Mark size={36} />
          <span>Aethar Tech</span>
        </a>
        <nav aria-label="Main">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-title-wrap">
            <div className="hero-orbit" aria-hidden="true">
              <svg viewBox="0 0 1200 400" preserveAspectRatio="none">
                <ellipse cx="600" cy="200" rx="590" ry="120" transform="rotate(-6 600 200)" pathLength="1" />
              </svg>
              <span className="hero-planet" />
            </div>
            <h1 id="hero-title" className="hero-title">Aethar Tech</h1>
          </div>
          <p className="hero-lede">
            We design and build web, Android and desktop apps. Four are live today, covering
            customer loyalty, private browsing over Tor, AI characters and astronomy.
          </p>
          <div className="hero-actions">
            <a className="button" href="#work">See our apps</a>
            <a className="button button-quiet" href="#contact">Start a project</a>
          </div>
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <h2 id="work-title">What we’ve built</h2>
          <p className="section-lede">
            Real products with real users, each built end to end by our team: design, apps, backend and launch.
          </p>
          <div className="projects">
            {projects.map((p) => <Project key={p.id} p={p} />)}
          </div>
        </section>

        <section id="approach" className="approach" aria-labelledby="approach-title">
          <h2 id="approach-title">How we build</h2>
          <div className="principles">
            <div>
              <h3>Made for real connections</h3>
              <p>Our apps keep working on slow or patchy data. The ZAS app reads lessons offline and computes the sky on the phone itself.</p>
            </div>
            <div>
              <h3>Private by default</h3>
              <p>We collect only what an app needs. Centium keeps no logs, and MyCharacter keeps private character notes visible to their owner only.</p>
            </div>
            <div>
              <h3>Lean to run</h3>
              <p>We pick infrastructure that stays cheap as you grow. MyCharacter AI was built to run on free tiers from day one.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <Mark size={72} />
          <h2 id="contact-title">Have an app in mind?</h2>
          <p>Tell us what you want to build. We’ll reply with how we’d approach it and a rough timeline.</p>
          <a className="button button-light" href={`mailto:${CONTACT_EMAIL}`}>Email {CONTACT_EMAIL}</a>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Aethar Tech</p>
        <ul aria-label="Our apps">
          {projects.map((p) => (
            <li key={p.id}><a href={p.url} target="_blank" rel="noopener">{p.name}</a></li>
          ))}
        </ul>
      </footer>
    </>
  )
}

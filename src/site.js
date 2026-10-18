// SITE_URL is used for canonical URLs, the sitemap, Open Graph tags and structured data.
export const SITE_URL = 'https://aethar-tech.web.app'
export const CONTACT_EMAIL = 'mashikiselby@gmail.com'

const RELEASES = 'https://github.com/Kolgrim33/aethar-tech/releases/download'

export const projects = [
  {
    id: 'moro',
    name: 'Moro',
    tagline: 'Every visit counts.',
    kind: 'Loyalty rewards',
    url: 'https://moro.web.app',
    icon: '/img/moro.webp',
    shots: ['/img/shots/moro-2.webp', '/img/shots/moro-1.webp'],
    color: '#1FB57A',
    glow: '#0E5C3E',
    summary:
      'Moro turns paper punch cards into digital loyalty passports. Scan the QR code at the till, collect visits, and unlock bigger discounts the more often you come back to the shops you love.',
    platforms: ['Web'],
    category: 'BusinessApplication',
    os: 'Web',
  },
  {
    id: 'centium',
    name: 'Centium VPN',
    tagline: 'Your whole phone, through Tor.',
    kind: 'Privacy',
    url: 'https://centium.web.app',
    apk: 'https://github.com/Kolgrim33/centiumvpn/releases/latest',
    icon: '/img/centium.webp',
    shots: ['/img/shots/centium-3.webp', '/img/shots/centium-1.webp', '/img/shots/centium-4.webp'],
    color: '#6C5CFF',
    glow: '#2B2380',
    summary:
      'One tap sends every app on your phone through three Tor relays. No account, no logs, and if Tor ever drops, your traffic stops instead of leaking.',
    platforms: ['Android', 'Linux'],
    category: 'SecurityApplication',
    os: 'Android, Linux',
  },
  {
    id: 'mycharacter',
    name: 'MyCharacter AI',
    tagline: 'Characters who feel alive.',
    kind: 'AI companions',
    url: 'https://mycharacterai.web.app',
    apk: `${RELEASES}/mycharacter-v1.0.0/mycharacter-ai-1.0.0-arm64.apk`,
    icon: '/img/mycharacter.webp',
    shots: ['/img/shots/mycharacter-3.webp', '/img/shots/mycharacter-1.webp', '/img/shots/mycharacter-2.webp'],
    color: '#F2A93B',
    glow: '#5A2E6E',
    summary:
      'Airship captains, detectives, forest spirits and robots, ready to talk. Create your own with a face, a past and a way of speaking, and they’ll remember what matters.',
    platforms: ['Android'],
    category: 'EntertainmentApplication',
    os: 'Android',
  },
  {
    id: 'zas',
    name: 'ZAS',
    tagline: 'The southern sky, from Zimbabwe.',
    kind: 'Astronomy',
    url: 'https://zas-explore-universe.web.app',
    apk: `${RELEASES}/zas-v0.1.0/zas-astronomy-0.1.0-arm64.apk`,
    icon: '/img/zas.webp',
    shots: ['/img/shots/zas-2.webp', '/img/shots/zas-1.webp', '/img/shots/zas-5.webp'],
    color: '#FFFFFF',
    glow: '#1A1F4D',
    summary:
      'The official app of the Zimbabwe Astronomical Society. See what’s up tonight over your town, catch every eclipse and meteor shower, and earn certificates as you learn the stars.',
    platforms: ['Android', 'Web'],
    category: 'EducationalApplication',
    os: 'Android, Web',
  },
]

// Change these before going live: the domain is used for canonical URLs,
// the sitemap, Open Graph tags and structured data.
export const SITE_URL = 'https://aethar-tech.web.app'
export const CONTACT_EMAIL = 'mashikiselby@gmail.com'

export const projects = [
  {
    id: 'moro',
    name: 'Moro',
    kind: 'Customer loyalty platform',
    url: 'https://moro.web.app',
    icon: '/img/moro.webp',
    color: '#1FB57A',
    summary:
      'Moro replaces paper punch cards with digital loyalty passports. Customers scan a QR code at the till, collect visits and unlock bigger discounts the more often they come back.',
    features: [
      'Stores set their own reward tiers, like 5% off on the 3rd visit and a VIP perk on the 10th',
      'A full-screen till display that turns any tablet into a check-in counter',
      'Owners see foot traffic and how often customers return',
    ],
    platforms: 'Web',
    stack: 'React, TypeScript, Firebase',
    category: 'BusinessApplication',
    os: 'Web',
  },
  {
    id: 'centium',
    name: 'Centium VPN',
    kind: 'Privacy VPN over Tor',
    url: 'https://centium.web.app',
    icon: '/img/centium.webp',
    color: '#4B3FD8',
    summary:
      'Centium sends all of a device’s traffic through the Tor network with one tap. No account and no logs, and the kill switch blocks traffic if the tunnel drops.',
    features: [
      'Covers every app on the device, not just the browser',
      'DNS is resolved inside Tor, so lookups never leak',
      'Native Android app plus a Linux desktop app',
    ],
    platforms: 'Android, Linux',
    stack: 'Kotlin, Tor, React, Node.js',
    category: 'SecurityApplication',
    os: 'Android, Linux',
  },
  {
    id: 'mycharacter',
    name: 'MyCharacter AI',
    kind: 'AI character chat',
    url: 'https://mycharacterai.web.app',
    apk: 'https://github.com/Kolgrim33/aethar-tech/releases/download/mycharacter-v1.0.0/mycharacter-ai-1.0.0-arm64.apk',
    icon: '/img/mycharacter.webp',
    color: '#F2A93B',
    summary:
      'Create original AI characters with their own personality, backstory and speaking style, then have long conversations with them. Characters remember what matters in a chat.',
    features: [
      'A four-step creator, with private fields only the owner can see',
      'Discover the most-chatted characters, with a Teen filter',
      'Reporting, blocking and a moderator review queue built in',
    ],
    platforms: 'Android',
    stack: 'Expo, Cloudflare Workers, Firebase',
    category: 'EntertainmentApplication',
    os: 'Android',
  },
  {
    id: 'zas',
    name: 'ZAS app',
    kind: 'Astronomy for Zimbabwe',
    url: 'https://zas-explore-universe.web.app',
    apk: 'https://github.com/Kolgrim33/aethar-tech/releases/download/zas-v0.1.0/zas-astronomy-0.1.0-arm64.apk',
    icon: '/img/zas.webp',
    color: '#161A3A',
    summary:
      'The official app of the Zimbabwe Astronomical Society. It shows what’s in tonight’s sky from your town, teaches astronomy with short lessons and issues certificates when you pass.',
    features: [
      'Planets and sky events to 2027, worked out for Zimbabwean towns',
      '19 lessons with quizzes and verifiable certificates',
      'A red night-vision mode for observing outdoors',
    ],
    platforms: 'Android, Web',
    stack: 'Expo, Firebase, Astronomy Engine',
    category: 'EducationalApplication',
    os: 'Android, Web',
  },
]

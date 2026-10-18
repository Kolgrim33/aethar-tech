// Bakes the rendered page, absolute URLs and structured data into dist/,
// so crawlers and link previews get full content without running JS.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { render, SITE_URL, projects } from '../dist-ssr/entry-server.js'

const today = new Date().toISOString().slice(0, 10)

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'Aethar Tech',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo-512.png`,
      description: 'Independent technology company and the home of Moro, Centium VPN, MyCharacter AI and ZAS.',
    },
    {
      '@type': 'WebSite',
      name: 'Aethar Tech',
      url: `${SITE_URL}/`,
      publisher: { '@id': `${SITE_URL}/#org` },
    },
    {
      '@type': 'ItemList',
      name: 'Apps built by Aethar Tech',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: p.name,
          url: p.url,
          image: `${SITE_URL}${p.icon}`,
          description: p.summary,
          applicationCategory: p.category,
          operatingSystem: p.os,
          creator: { '@id': `${SITE_URL}/#org` },
        },
      })),
    },
  ],
}

let html = readFileSync('dist/index.html', 'utf8')
  .replaceAll('__SITE_URL__', SITE_URL)
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace('</head>', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n</head>`)
writeFileSync('dist/index.html', html)

writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod></url>
</urlset>
`,
)
rmSync('dist-ssr', { recursive: true, force: true })
console.log('prerendered dist/index.html, robots.txt, sitemap.xml')

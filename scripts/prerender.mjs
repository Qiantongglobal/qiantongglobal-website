/**
 * Build-time static prerender.
 *
 * Runs after `vite build`. Loads the React tree through Vite's SSR module
 * loader (so TSX, path aliases and CSS imports resolve exactly as they do in
 * the app), renders every sitemap route with StaticRouter, and writes one
 * self-contained index.html per route into dist/.
 *
 * The browser hydrates that markup (see src/main.tsx), so crawlers that never
 * run JavaScript — and social/AI fetchers — still get the full page content,
 * a per-route canonical, and per-route structured data.
 */
import { createServer } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function replaceMeta(html, attr, key, value) {
  const re = new RegExp(`<meta ${attr}="${escapeRe(key)}"[^>]*>`)
  const tag = `<meta ${attr}="${key}" content="${value}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
}

function replaceLink(html, rel, value) {
  const re = new RegExp(`<link rel="${rel}"[^>]*>`)
  const tag = `<link rel="${rel}" href="${value}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
}

function replaceHreflang(html, href) {
  const re = /<link rel="alternate" hreflang="x-default"[^>]*>/
  const tag = `<link rel="alternate" hreflang="x-default" href="${href}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
}

function injectJsonLd(html, json) {
  if (!json) return html
  const tag = `<script type="application/ld+json" data-page-seo="true">${json}</script>`
  return html.replace('</head>', `  ${tag}\n  </head>`)
}

function escapeAttr(v) {
  return String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function main() {
  const template = await readFile(join(distDir, 'index.html'), 'utf8')

  const vite = await createServer({
    root,
    configFile: join(root, 'vite.config.ts'),
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'warn',
  })

  let rendered = 0
  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
    const { categories, skuPath } = await vite.ssrLoadModule('/src/lib/products.ts')
    const { articles } = await vite.ssrLoadModule('/src/lib/resources.ts')
    const { SITE_URL } = await vite.ssrLoadModule('/src/components/Seo.tsx')

    // Derive routes straight from the product/article data so prerendered
    // pages, the sitemap, and the live catalogue can never drift apart.
    const today = new Date().toISOString().slice(0, 10)
    const entries = [
      { path: '/', priority: '1.0', freq: 'weekly' },
      { path: '/products', priority: '0.9', freq: 'weekly' },
      // Category landing pages (owner-approved copy, 2026-11-23)
      ...categories.map((c) => ({ path: `/products/${c.id}`, priority: '0.8', freq: 'weekly' })),
      ...categories.flatMap((c) =>
        c.skus.map((sku) => ({ path: skuPath(c, sku), priority: '0.8', freq: 'monthly' }))
      ),
      { path: '/privacy', priority: '0.3', freq: 'yearly' },
      { path: '/resources', priority: '0.7', freq: 'weekly' },
      ...articles.map((a) => ({ path: `/resources/${a.slug}`, priority: '0.6', freq: 'monthly' })),
    ]

    // Regenerate sitemap.xml in dist from this single source of truth.
    const locs = entries
      .map(
        (e) =>
          `  <url>\n    <loc>${SITE_URL}${e.path}</loc>\n    <lastmod>${today}</lastmod>\n` +
          `    <changefreq>${e.freq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
      )
      .join('\n')
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs}\n</urlset>\n`
    await writeFile(join(distDir, 'sitemap.xml'), sitemapXml, 'utf8')

    const paths = entries.map((e) => e.path)
    for (const pathname of paths) {
      const { html, seo } = render(pathname)
      if (!seo) throw new Error(`No <Seo> snapshot captured for ${pathname}`)

      const canonical = escapeAttr(seo.url)
      let page = template
      page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(seo.fullTitle)}</title>`)
      page = replaceMeta(page, 'name', 'description', escapeAttr(seo.description))
      page = replaceMeta(page, 'property', 'og:title', escapeAttr(seo.fullTitle))
      page = replaceMeta(page, 'property', 'og:description', escapeAttr(seo.description))
      page = replaceMeta(page, 'property', 'og:url', canonical)
      page = replaceMeta(page, 'name', 'twitter:title', escapeAttr(seo.fullTitle))
      page = replaceMeta(page, 'name', 'twitter:description', escapeAttr(seo.description))
      page = replaceMeta(page, 'name', 'twitter:url', canonical)
      page = replaceLink(page, 'canonical', canonical)
      page = replaceHreflang(page, canonical)
      if (seo.noindex) page = replaceMeta(page, 'name', 'robots', 'noindex, follow')
      page = injectJsonLd(page, seo.jsonLd)
      page = page.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )

      const rel = pathname === '/' ? 'index.html' : join(pathname.replace(/^\/+/, ''), 'index.html')
      const outFile = join(distDir, rel)
      await mkdir(dirname(outFile), { recursive: true })
      await writeFile(outFile, page, 'utf8')
      rendered += 1
      console.log(`  ${relative(distDir, outFile)}  <-  ${pathname}`)
    }
  } finally {
    await vite.close()
  }

  console.log(`\nPrerendered ${rendered} routes into ${distDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

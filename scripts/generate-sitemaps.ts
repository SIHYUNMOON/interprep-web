import { neon } from '@neondatabase/serverless'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://interprep.academy'

async function generateSitemaps() {
  try {
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set')
    }

    const sql = neon(databaseUrl)

    // Query all posts
    console.log('[sitemap-gen] Querying posts...')
    const posts = await sql`
      SELECT id, created_at, updated_at FROM posts ORDER BY created_at DESC
    `

    console.log(`[sitemap-gen] Found ${posts.length} posts`)

    // Generate sitemap-pages.xml (static pages)
    const staticPages = [
      '/',
      '/about',
      '/about/philosophy',
      '/team',
      '/location',
      '/sat',
      '/presat',
      '/toefl',
      '/art-english',
      '/ipass',
      '/admission-results',
      '/faq',
      '/credit-system',
      '/contact',
    ]

    let pagesSitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    pagesSitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for (const page of staticPages) {
      pagesSitemapXml += '  <url>\n'
      pagesSitemapXml += `    <loc>${BASE_URL}${page}</loc>\n`
      pagesSitemapXml += '    <changefreq>monthly</changefreq>\n'
      pagesSitemapXml += '    <priority>0.6</priority>\n'
      pagesSitemapXml += '  </url>\n'
    }

    pagesSitemapXml += '</urlset>'

    // Generate sitemap-board.xml (board posts)
    let boardSitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    boardSitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    // Board index
    boardSitemapXml += '  <url>\n'
    boardSitemapXml += `    <loc>${BASE_URL}/board</loc>\n`
    boardSitemapXml += '    <changefreq>daily</changefreq>\n'
    boardSitemapXml += '    <priority>0.7</priority>\n'
    boardSitemapXml += '  </url>\n'

    // Board archive
    boardSitemapXml += '  <url>\n'
    boardSitemapXml += `    <loc>${BASE_URL}/board/archive</loc>\n`
    boardSitemapXml += '    <changefreq>monthly</changefreq>\n'
    boardSitemapXml += '    <priority>0.8</priority>\n'
    boardSitemapXml += '  </url>\n'

    // Board posts
    for (const post of posts) {
      const lastmod = post.updated_at || post.created_at
      const lastmodDate = new Date(lastmod).toISOString().split('T')[0]

      boardSitemapXml += '  <url>\n'
      boardSitemapXml += `    <loc>${BASE_URL}/board/${post.id}</loc>\n`
      boardSitemapXml += `    <lastmod>${lastmodDate}</lastmod>\n`
      boardSitemapXml += '    <changefreq>never</changefreq>\n'
      boardSitemapXml += '    <priority>0.9</priority>\n'
      boardSitemapXml += '  </url>\n'
    }

    boardSitemapXml += '</urlset>'

    // Generate sitemap.xml (index)
    let indexSitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    indexSitemapXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    indexSitemapXml += '  <sitemap>\n'
    indexSitemapXml += `    <loc>${BASE_URL}/sitemap-pages.xml</loc>\n`
    indexSitemapXml += '  </sitemap>\n'
    indexSitemapXml += '  <sitemap>\n'
    indexSitemapXml += `    <loc>${BASE_URL}/sitemap-board.xml</loc>\n`
    indexSitemapXml += '  </sitemap>\n'
    indexSitemapXml += '</sitemapindex>'

    // Write files to /public
    const publicDir = path.join(process.cwd(), 'public')

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexSitemapXml, 'utf-8')
    console.log('[sitemap-gen] Created /public/sitemap.xml')

    fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), pagesSitemapXml, 'utf-8')
    console.log('[sitemap-gen] Created /public/sitemap-pages.xml')

    fs.writeFileSync(path.join(publicDir, 'sitemap-board.xml'), boardSitemapXml, 'utf-8')
    console.log('[sitemap-gen] Created /public/sitemap-board.xml')

    console.log('[sitemap-gen] ✓ All sitemaps generated successfully')
  } catch (error) {
    console.error('[sitemap-gen] Error:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

generateSitemaps()

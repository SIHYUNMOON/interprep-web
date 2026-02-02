/**
 * Verification script for sitemap and robots.txt endpoints.
 * Tests that all crawlers can fetch these files with HTTP 200 regardless of headers.
 * 
 * Run: npm run verify:sitemaps
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const TARGET_URLS = [
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap-pages.xml',
  '/sitemap-board.xml',
]

const HEADERS_VARIANTS = [
  { name: 'default', headers: {} },
  { name: 'curl-like', headers: { 'User-Agent': 'curl/8.0' } },
  { name: 'python-requests', headers: { 'User-Agent': 'python-requests/2.31.0' } },
  { name: 'googlebot', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } },
  { name: 'accept-json', headers: { 'Accept': 'application/json' } },
  { name: 'accept-wildcard', headers: { 'Accept': '*/*' } },
]

async function testEndpoint(url, headers) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'sitemap-verifier/1.0',
        ...headers,
      },
    })

    const status = response.status
    const contentType = response.headers.get('content-type') || 'unknown'

    return {
      success: status === 200,
      status,
      contentType,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      status: null,
      contentType: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

async function runTests() {
  console.log(`\n=== Sitemap & Robots.txt Verification ===\n`)
  console.log(`Base URL: ${BASE_URL}\n`)

  let allPassed = true

  for (const pathname of TARGET_URLS) {
    console.log(`\n📋 Testing: ${pathname}`)
    console.log('─'.repeat(60))

    let pathPassed = true

    for (const variant of HEADERS_VARIANTS) {
      const fullUrl = `${BASE_URL}${pathname}`
      const result = await testEndpoint(fullUrl, variant.headers)

      const statusEmoji = result.success ? '✓' : '✗'
      const statusStr = result.status ? `${result.status}` : 'FAIL'

      console.log(
        `  ${statusEmoji} [${variant.name.padEnd(20)}] ${statusStr.padEnd(4)} | ${result.contentType || result.error || 'N/A'}`
      )

      if (!result.success) {
        pathPassed = false
        allPassed = false
      }
    }

    console.log(
      `\n  Result: ${pathPassed ? '✓ ALL PASSED' : '✗ SOME FAILED'}`
    )
  }

  console.log('\n' + '═'.repeat(60))
  console.log(`\nFinal Result: ${allPassed ? '✓ ALL ENDPOINTS OK' : '✗ FAILURES DETECTED'}\n`)

  process.exit(allPassed ? 0 : 1)
}

runTests().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

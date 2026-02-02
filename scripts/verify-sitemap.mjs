#!/usr/bin/env node
import http from 'http'

const baseURL = process.env.BASE_URL || 'http://localhost:3001'
const url = new URL('/sitemap.xml', baseURL)

console.log(`\n🔍 Verifying sitemap at: ${url.toString()}\n`)

const request = http.get(url, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    const checks = [
      {
        name: 'HTTP Status 200',
        pass: res.statusCode === 200,
        details: `Got ${res.statusCode}`,
      },
      {
        name: 'Content-Type: XML',
        pass: res.headers['content-type']?.includes('xml'),
        details: res.headers['content-type'] || 'missing',
      },
      {
        name: 'Contains <urlset>',
        pass: data.includes('<urlset'),
        details: data.includes('<urlset') ? 'Found' : 'Not found',
      },
      {
        name: 'Contains /board/ URLs',
        pass: data.includes('/board/'),
        details: data.includes('/board/') ? 'Found' : 'Not found',
      },
      {
        name: 'Contains priority tags',
        pass: data.includes('<priority>'),
        details: data.includes('<priority>') ? 'Found' : 'Not found',
      },
      {
        name: 'XML well-formed',
        pass: data.includes('<?xml'),
        details: data.includes('<?xml') ? 'Found XML declaration' : 'Missing',
      },
    ]

    let allPass = true
    checks.forEach((check) => {
      const icon = check.pass ? '✅' : '❌'
      console.log(`${icon} ${check.name}: ${check.details}`)
      if (!check.pass) allPass = false
    })

    console.log()
    if (allPass) {
      console.log('✨ All checks passed! Sitemap is ready for deployment.\n')
      process.exit(0)
    } else {
      console.log(
        '⚠️  Some checks failed. Please review the sitemap implementation.\n'
      )
      process.exit(1)
    }
  })
})

request.on('error', (error) => {
  console.error(
    `\n❌ Failed to reach ${url.toString()}\n`,
    `Error: ${error.message}\n`
  )
  console.log(
    'Make sure the dev server is running. Try: npm run dev:3001\n'
  )
  process.exit(1)
})

request.setTimeout(5000, () => {
  request.destroy()
  console.error(`\n❌ Request timeout after 5s\n`)
  process.exit(1)
})

# Sitemap & Robots.txt Configuration Guide

## Overview
The Interprep website serves sitemap and robots.txt files as **static files** from `/public/` directory. These files must be accessible to all crawlers (bots, AI tools, search engines) with HTTP 200 responses, regardless of User-Agent or other request headers.

## Static Files Location
All files are served directly from `/public/`:
- `/public/robots.txt` → accessible as `https://interprep.academy/robots.txt`
- `/public/sitemap.xml` → accessible as `https://interprep.academy/sitemap.xml`
- `/public/sitemap-pages.xml` → accessible as `https://interprep.academy/sitemap-pages.xml`
- `/public/sitemap-board.xml` → accessible as `https://interprep.academy/sitemap-board.xml`

## Important: No Dynamic Routes
There are **NO** dynamic route handlers for these paths:
- ✓ REMOVED: `app/sitemap.ts` (was dynamic, now static)
- ✓ NO: `pages/sitemap.xml.ts`
- ✓ NO: `api/sitemap` routes

## Configuration Requirements

### 1. Next.js Configuration (next.config.mjs)
- ✓ No rewrites or redirects for `/robots.txt`, `/sitemap*.xml` paths
- ✓ These paths are served directly from `/public/` by Next.js static file handler
- ✓ Comment added documenting static sitemap policy

### 2. Middleware (if present)
If `middleware.ts` exists in the project root:
- Add explicit exclusion in `config.matcher` to bypass these paths:
  ```typescript
  export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - robots.txt (SEO)
       * - sitemap.xml (SEO)
       * - _next/static (static files)
       * - _next/image (image optimization)
       * - favicon.ico (favicon file)
       * - public/* (static assets)
       */
      '/((?!robots\\.txt|sitemap.*\\.xml|_next/static|_next/image|favicon\\.ico|public).*)',
    ],
  }
  ```

### 3. Vercel / Edge Middleware (if applicable)
If you have `vercel.json` with rewrites or edge middleware:
- Ensure NO rewrite rules capture `/robots.txt`, `/sitemap*.xml`, `/public/*`
- Example of problematic rewrite to AVOID:
  ```json
  "rewrites": [
    { "source": "/:path*", "destination": "/api/:path*" }
  ]
  ```
  This would break static files. Add exclusions:
  ```json
  "rewrites": [
    { "source": "/((?!robots\\.txt|sitemap.*\\.xml|public).*)", "destination": "/api/:path*" }
  ]
  ```

### 4. WAF / CDN / Bot Protection Rules
If using Vercel Firewall, Cloudflare, or similar:

**ALLOWLIST these paths** (never challenge or block):
- `/robots.txt`
- `/sitemap.xml`
- `/sitemap-pages.xml`
- `/sitemap-board.xml`

**Do NOT:**
- Add CAPTCHA challenges
- Rate-limit these paths
- Require authentication
- Block based on User-Agent (all bots must be allowed)
- Redirect or rewrite these paths

**Example Cloudflare Rules:**
```
If request path contains "robots.txt" or "sitemap" 
AND request path matches "/(robots\.txt|sitemap.*\.xml)"
Then allow (skip security checks)
```

### 5. Content-Type Headers
These are automatically set by Next.js static file serving:
- XML files: `application/xml; charset=utf-8`
- robots.txt: `text/plain; charset=utf-8`
- Caching: `public, immutable` (safe for static files)

## Regenerating Sitemaps

When database content changes (new posts), regenerate the static XML files:

```bash
npm run generate:sitemaps
```

This queries the database and writes fresh XML files to `/public/`. Once generated, they are served directly without any dynamic computation.

## Verification

To verify all endpoints return HTTP 200 with various headers:

```bash
npm run verify:sitemaps
```

This tests:
- Default fetch request
- curl-like User-Agent
- python-requests User-Agent
- Googlebot User-Agent
- Various Accept headers

## Deployment Checklist

- [ ] `/public/sitemap.xml` exists and is valid XML
- [ ] `/public/sitemap-pages.xml` exists and is valid XML
- [ ] `/public/sitemap-board.xml` exists and is valid XML
- [ ] `/public/robots.txt` exists
- [ ] No dynamic route handlers (no `app/sitemap.ts`)
- [ ] Middleware (if present) excludes these paths
- [ ] No rewrites/redirects capture these paths
- [ ] WAF/CDN allowlists these paths (if applicable)
- [ ] `npm run verify:sitemaps` passes (returns 200 for all endpoints)
- [ ] Production deployment confirmed to serve files with 200 status

## File Contents

### robots.txt
```plaintext
User-agent: *
Allow: /

Sitemap: https://interprep.academy/sitemap.xml
```

### sitemap.xml (index)
References the split sitemaps:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://interprep.academy/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://interprep.academy/sitemap-board.xml</loc>
  </sitemap>
</sitemapindex>
```

### sitemap-pages.xml
Contains static pages (home, programs, about, etc.)

### sitemap-board.xml
Contains board index, archive, and all 82 post URLs with lastmod dates

## Troubleshooting

**Issue:** GET /sitemap.xml returns 404
- Check that `/public/sitemap.xml` file exists
- Verify Next.js is serving static files from /public
- Check that no middleware or rewrite is blocking the request

**Issue:** GET /sitemap.xml returns 400/403
- WAF or bot protection is likely blocking the request
- Allowlist `/sitemap*.xml` and `/robots.txt` in your CDN/WAF
- Remove any User-Agent blocking rules

**Issue:** Wrong Content-Type header
- Next.js should auto-detect `.xml` → `application/xml`
- If CDN overrides headers, configure to preserve XML Content-Type

**Issue:** Sitemaps are stale
- Run `npm run generate:sitemaps` after adding new posts
- Add this to your CI/CD pipeline (run after new posts are published)

# Bot Visibility & SEO Enhancement

## New NPM Scripts

### `npm run diag:bot`
Compares how bots vs humans see the board pages. Tests:
- Board list page HTML content
- Post link discovery
- Empty state detection
- Diagnostic API response

**When to use**: 
- After making changes to board pages
- To verify bots can see content
- Before submitting sitemap to search engines

**Expected output**: Exit code 0 with "✅ No issues detected"

### `npm run verify:sitemap`
Verifies sitemap.xml is accessible and properly formatted. Tests:
- HTTP 200 status code
- XML structure validity
- Presence of board post URLs
- Content consistency

**When to use**:
- Before production deployment
- After adding new post types
- To verify sitemap isn't cached incorrectly

**Expected output**: All checks pass ✅

## Diagnostic Endpoint

### `GET /api/diag/board-visibility`
Returns bot detection and content availability info.

**Response**:
```json
{
  "timestamp": "2026-02-02T...",
  "runtime": "nodejs",
  "userAgent": "Googlebot/2.1...",
  "isBot": true,
  "postsCount": 42,
  "samplePostId": "uuid-here",
  "pageInfo": {
    "currentPage": 1,
    "pageSize": 10,
    "totalPages": 5,
    "itemsReturned": 10
  }
}
```

**Note**: This is a diagnostic tool. Can be removed after confirming production works correctly.

## How Bot Discovery Works

### Server-Side Rendering (SSR)
- Board list page now renders posts on the server
- Bots receive fully populated HTML on first request
- No JavaScript required to see content
- 60-second ISR revalidation for freshness

### Hidden Semantic Links
- Board page includes hidden `<Link>` section for crawlers
- Uses `sr-only` class (screen-reader only)
- Provides explicit post URLs for discovery
- Doesn't affect visual design

### Sitemap Integration
- All posts automatically included in sitemap.xml
- Updates when posts are added/modified
- Gracefully handles DB connection failures

## SEO Best Practices Applied

✅ Server-side rendering for initial content
✅ Proper semantic HTML structure
✅ Meta tags for social sharing
✅ Clean URL structure (/board/{uuid})
✅ XML sitemap with all content
✅ No user-agent discrimination
✅ Fast initial page load

## Testing Guide

See [docs/quick-testing-guide.md](./docs/quick-testing-guide.md) for detailed testing instructions.

## Implementation Details

See [docs/bot-visibility-fix-summary.md](./docs/bot-visibility-fix-summary.md) for complete implementation details and architectural decisions.

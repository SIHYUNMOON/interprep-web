# Bot Visibility Fix - Implementation Summary

## Overview
Fixed the issue where board posts were visible to human browsers but not to AI/search engine bots. The sitemap.xml was already working correctly, but the main issue was that the board list page was client-side only (CSR), preventing bots from discovering post links.

## Changes Made

### 1. Diagnostic Endpoint (Part A1)
**File**: `app/api/diag/board-visibility/route.ts`
- Created diagnostic endpoint at `/api/diag/board-visibility`
- Returns JSON with:
  - User-Agent detection
  - Bot detection flag
  - Post count from database
  - Sample post ID
  - Runtime information
- Always returns no-cache headers to prevent false positives

### 2. Bot vs Human Comparison Script (Part A2)
**File**: `scripts/compare-bot-human.mjs`
- Compares responses for different User-Agents:
  - Chrome (human)
  - Googlebot
  - GPTBot
- Tests both `/board` page HTML and diagnostic API
- Checks for:
  - Post link presence in HTML
  - Empty state messages
  - Post count consistency
- Exit code 1 if issues detected
- Added npm script: `npm run diag:bot`

### 3. Server-Side Rendering for Board List (Part B3)
**File**: `app/board/page.tsx`
- Changed from pure client component to SSR
- Fetches initial posts server-side using `getPosts()`
- Added `revalidate = 60` for ISR (Incremental Static Regeneration)
- Passes `initialPosts`, `initialTotalCount`, `initialTotalPages` to client component
- Bots now see populated HTML with post data on first load

**File**: `app/board/client.tsx`
- Updated to accept `initialPosts` props
- Added `Link` import from `next/link`
- Added hidden SSR section with proper semantic links for bot discovery:
  ```tsx
  <div className="sr-only" aria-hidden="true">
    <h2>게시물 링크 (봇용)</h2>
    <ul>
      {initialPosts.map((post) => (
        <li key={post.id}>
          <Link href={`/board/${post.id}`}>
            {post.title} - {post.category}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  ```
- Uses `sr-only` class (screen-reader only) - visually hidden but crawlable
- Maintains all existing client-side functionality

### 4. Fixed Sitemap Type Error
**File**: `app/sitemap.ts`
- Fixed TypeScript type error in neon SQL query
- Changed from generic type parameter to type assertion
- Sitemap already includes all posts with correct structure

### 5. Package.json Updates
**File**: `package.json`
- Added `diag:bot` script for bot comparison testing
- `verify:sitemap` script was already present

## No User-Agent Gating Found (Part B1)
✅ **Confirmed**: No middleware or API routes filter based on User-Agent
✅ **Confirmed**: No bot-specific blocking logic exists
✅ **Confirmed**: Public routes return same data for all User-Agents

## Sitemap Already Working (Part C)
✅ **Confirmed**: `app/sitemap.ts` correctly implements Next.js App Router sitemap
✅ **Confirmed**: Includes all static pages
✅ **Confirmed**: Dynamically includes all `/board/{uuid}` posts
✅ **Confirmed**: Uses proper lastModified from `updated_at`
✅ **Confirmed**: Returns 200 OK with fallback to static pages if DB fails
✅ **Confirmed**: Verification script already exists at `scripts/verify-sitemap.mjs`

## Testing Instructions

### Test Diagnostic Endpoint
```bash
# Start dev server
npm run dev

# Test in another terminal
curl http://localhost:3000/api/diag/board-visibility

# Test with bot UA
curl -A "Googlebot/2.1" http://localhost:3000/api/diag/board-visibility
```

### Test Bot vs Human Differences
```bash
# Make sure dev server is running
npm run dev

# In another terminal
npm run diag:bot
```

### Verify Sitemap
```bash
# Option 1: Use existing verification script
npm run verify:sitemap

# Option 2: Manual check
curl http://localhost:3000/sitemap.xml
```

### Verify SSR Works
```bash
# Fetch /board with bot UA
curl -A "Googlebot/2.1" http://localhost:3000/board | grep -o 'href="/board/[a-f0-9-]*"'

# Should see multiple post links in HTML
```

## Key Improvements

### Before
- ❌ `/board` page was pure client-side React
- ❌ Bots saw empty HTML skeleton
- ❌ No post links in initial HTML
- ❌ Posts only loaded after JavaScript execution

### After
- ✅ `/board` page uses SSR/ISR
- ✅ Bots see fully populated HTML
- ✅ Post links present in initial HTML (both visible table and hidden list)
- ✅ JavaScript progressively enhances UX
- ✅ 60-second revalidation for fresh content
- ✅ Diagnostic tools for ongoing monitoring

## Architecture Decisions

### Why SSR over Static Generation?
- Board content changes frequently (new posts)
- ISR with 60-second revalidation balances freshness and performance
- Ensures bots always see recent content

### Why Hidden Link Section?
- Primary table already has links via `onClick` handlers
- Added semantic `<Link>` components for better SEO
- `sr-only` class hides from visual users but exposes to crawlers
- Doesn't affect user experience
- Provides explicit structure for discovery

### Why Not Remove Client-Side Fetching?
- Maintains all existing functionality (filtering, sorting, pagination)
- Client-side provides instant feedback for user interactions
- Initial SSR payload serves bot discovery
- Progressive enhancement pattern

## Security Considerations

✅ No authentication bypass - diagnostic endpoint doesn't expose post content
✅ No admin exposure - all changes affect public read-only routes only
✅ Rate limiting can be added at CDN/middleware level if needed
✅ Hidden links use `aria-hidden="true"` to avoid screen reader confusion

## Performance Impact

- **Minimal**: Initial page now does one DB query server-side
- **Benefit**: Bots get instant content without JavaScript
- **Benefit**: Improved SEO rankings from better crawlability
- **Benefit**: Faster perceived load time for users (content visible immediately)

## Maintenance Notes

- Remove diagnostic endpoint `/api/diag/board-visibility` after confirming fix in production (optional)
- Keep diagnostic scripts for regression testing
- Monitor sitemap access logs to verify bot traffic
- Consider adding more posts to initial SSR payload if needed (currently 10)

## Files Created
1. `app/api/diag/board-visibility/route.ts` - Diagnostic endpoint
2. `scripts/compare-bot-human.mjs` - Bot comparison script

## Files Modified
1. `app/board/page.tsx` - Added SSR
2. `app/board/client.tsx` - Added initialPosts props and SSR links
3. `app/sitemap.ts` - Fixed type error
4. `package.json` - Added diag:bot script

## Verification Checklist

- [ ] Run `npm run diag:bot` and confirm exit code 0
- [ ] Run `npm run verify:sitemap` and confirm all checks pass
- [ ] Check `/api/diag/board-visibility` returns postsCount > 0 for all UAs
- [ ] Verify `/board` HTML contains `href="/board/{uuid}"` links
- [ ] Verify `/board/{uuid}` pages return 200 for existing posts
- [ ] Test with Google Search Console (fetch as Googlebot)
- [ ] Monitor sitemap.xml access in server logs
- [ ] Confirm no UI regressions for normal users

## Production Deployment

1. Deploy all changes
2. Run `BASE_URL=https://interprep.academy npm run diag:bot`
3. Run `BASE_URL=https://interprep.academy npm run verify:sitemap`
4. Submit sitemap to Google Search Console: https://interprep.academy/sitemap.xml
5. Request re-crawl for /board and key post URLs
6. Monitor search console for indexing progress

## Expected Results

Within 1-2 weeks of deployment:
- Google Search Console shows increased indexed pages
- Board posts appear in search results
- Sitemap shows "Success" status for board URLs
- Coverage report shows no "Discovered but not indexed" issues for board posts

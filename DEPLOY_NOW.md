# 🚀 Quick Start: Production Fixes Deployment

## What Happened

Production was showing:
- ❌ `/board` = "Total 0" (no posts)
- ❌ `/board/{id}` = "Post not found"
- ❌ `/sitemap.xml` = 404
- ✅ Local development = works fine

**Root cause**: Silent database failures + Edge Runtime incompatibility

## What's Fixed

✅ Enhanced error logging with context  
✅ Forced Node.js runtime (fixes Edge Runtime issue)  
✅ Added safe diagnostic endpoint  
✅ Added verification script  
✅ Created comprehensive documentation  

## Deploy Now (3 steps)

### 1. Review Changes
```bash
cd c:/Users/for/Desktop/문시현/new-interprep-0129
git diff --stat  # See what changed
# Or view files directly:
# - lib/db.ts (enhanced logging)
# - app/board/page.tsx (+ runtime)
# - app/board/[id]/page.tsx (+ runtime)
# - app/sitemap.ts (+ runtime)
# - app/api/diag/public-board/route.ts (NEW)
# - scripts/verify-production.mjs (NEW)
```

### 2. Test Locally
```bash
npm run build
# Should show:
# [sitemap] Successfully fetched posts: { count: 82 }
# [board] getPosts success: { page: 1, pageSize: 10, totalCount: 82, ... }
```

### 3. Deploy to Production
```bash
# Option A: Direct push
git push origin main

# Option B: Vercel CLI
vercel deploy --prod
```

## Verify Deployment

### Automatic (recommended)
```bash
# Run after deployment
BASE_URL=https://interprep.academy node scripts/verify-production.mjs

# Expected: All 5 checks pass
# ✅ /robots.txt = 200
# ✅ /sitemap.xml = 200 with XML
# ✅ /board = shows posts
# ✅ /api/diag/public-board = dbConnection ok
# ✅ /board/{id} = shows content
```

### Manual
```bash
# Test in browser or with curl:

# 1. Check posts load
curl https://interprep.academy/board
# Should NOT contain "Total 0" or "No posts"

# 2. Check diagnostics
curl https://interprep.academy/api/diag/public-board | jq .
# Should show: "dbConnection": "ok", "postsCount": 82

# 3. Check sitemap
curl https://interprep.academy/sitemap.xml
# Should have <urlset> and many <url> entries

# 4. Check specific post
curl https://interprep.academy/board/550e8400-e29b-41d4-a716-446655440000
# Should NOT contain "Post not found"
```

## If Something's Wrong

### `/board` still shows "Total 0"

```bash
# Step 1: Check diagnostics
curl https://interprep.academy/api/diag/public-board | jq .

# If dbConnection: "fail"
# → Check DATABASE_URL is set in Vercel environment variables
# → Verify format: postgresql://user:pass@host:port/db?ssl=true

# If dbConnection: "ok" but postsCount: 0
# → No posts exist, add some test posts
```

### `/sitemap.xml` returns 404

```bash
# Step 1: Check file exists
ls app/sitemap.ts

# Step 2: Rebuild and redeploy
npm run build
git push origin main

# Step 3: Wait 2 minutes and test again
```

### `/board/{id}` shows "Post not found"

```bash
# Step 1: Get a valid post ID
curl https://interprep.academy/api/diag/public-board | jq .samplePostId
# Returns: "550e8400-e29b-41d4-a716-446655440000"

# Step 2: Test with that ID
curl https://interprep.academy/board/550e8400-e29b-41d4-a716-446655440000
# Should NOT show "Post not found"

# If still fails, check Vercel logs for:
# [board] getPostById failed: { error: "...", id: "..." }
```

## What Changed (Summary)

| Component | Change |
|-----------|--------|
| Database layer | ✅ Better error logging |
| Board page | ✅ Force Node.js runtime |
| Post detail page | ✅ Force Node.js runtime |
| Sitemap | ✅ Force Node.js runtime + logging |
| New endpoint | ✅ `/api/diag/public-board` for diagnostics |
| New script | ✅ `scripts/verify-production.mjs` for testing |

## Success = All Green

```
✅ npm run build succeeds
✅ /robots.txt returns 200
✅ /sitemap.xml returns 200 with XML
✅ /board shows posts (not "Total 0")
✅ /board/{id} shows content (not "Post not found")
✅ /api/diag/public-board shows dbConnection: ok
✅ Verification script shows 5/5 passed
```

## Don't Forget

- ✅ DATABASE_URL must be set in Vercel environment
- ✅ Wait 2 minutes after deploy for ISR revalidation
- ✅ Check Vercel logs for any `[board]` error messages
- ✅ Run verification script to confirm all checks pass

## Need Details?

- For deep troubleshooting: Read `docs/prod-mismatch-root-cause.md`
- For quick reference: Read `docs/PRODUCTION_FIXES_SUMMARY.md`
- For complete overview: Read `PRODUCTION_FIXES_COMPLETE.md`

---

**Status**: Ready to deploy  
**Risk**: Low (backward compatible, no schema changes)  
**Time to deploy**: ~2 minutes (including 2-min ISR wait)  
**Time to verify**: ~1 minute with script  

# Production Mismatch Root Cause & Fixes

## 📋 Executive Summary

**Problem**: Production shows `/board` with "Total 0 / No posts", `/board/{uuid}` shows "Post not found", and `/sitemap.xml` returns 404, while local development works fine.

**Root Cause**: Silent error handling in database layer - when `getPosts()` or `getPostById()` fail, they return empty results without any indication that there was an error. Combined with missing runtime specification, this causes Edge Runtime to fail Neon database connections.

**Solution**: Add comprehensive diagnostics, explicit error logging, and ensure Node.js runtime for database operations.

---

## 🔍 Root Causes Identified

### 1. Silent Database Failures (Primary)

**What**: `lib/db.ts` functions `getPosts()` and `getPostById()` both catch all errors and return empty results:

```typescript
// OLD CODE - Silent failure
catch (error) {
  console.error('[v0] Get posts error:', error);
  return {
    items: [],
    totalCount: 0,
    // ... empty defaults
  };
}
```

**Why It's Bad**: This makes it impossible to distinguish between:
- ✅ Legitimate "no posts" (DB working, zero posts)
- ❌ DB connection failed (DATABASE_URL wrong/missing)
- ❌ Table doesn't exist
- ❌ Query execution failed

**Impact**: When production DB fails, users see "No posts" instead of "Service unavailable", making debugging impossible.

### 2. Missing Runtime Specification

**What**: Pages that use Neon serverless PostgreSQL didn't specify `export const runtime = 'nodejs'`

**Why It's Bad**: 
- Without explicit runtime, Next.js may run routes in Edge Runtime (Cloudflare Workers, etc.)
- Neon serverless requires Node.js runtime (not compatible with Edge Runtime)
- Database connections fail silently in Edge Runtime

**Impact**: In production on Vercel, these routes run in Edge Runtime by default, causing all DB queries to fail.

**Fixed Files**:
- `app/board/page.tsx`
- `app/board/[id]/page.tsx`
- `app/sitemap.ts`
- `app/api/diag/public-board/route.ts`

### 3. Poor Error Visibility

**What**: Old logging pattern `console.error('[v0] Get posts error:')` doesn't include context about what failed

**Why It's Bad**: Production logs don't show:
- Which parameters were used
- If it was a DB connection failure vs query failure
- What the actual error message was

**Impact**: When `/api/diag/public-board` shows "error": Can't debug without seeing database credentials/queries in logs.

---

## ✅ Fixes Implemented

### Fix 1: Enhanced Error Logging with Context

**File**: `lib/db.ts`

**Changes**:
```typescript
// NEW CODE - Explicit logging with context
catch (error) {
  const errorMsg = error instanceof Error ? error.message : String(error);
  console.error('[board] getPosts failed:', { 
    error: errorMsg,     // Actual error
    sort,                // Parameters that were used
    page,
    pageSize,
    category
  });
  return { items: [], totalCount: 0, ... };
}
```

**Benefits**:
- `[board]` prefix makes logs searchable in production
- Includes actual error message
- Includes parameters for reproduction
- Still returns empty gracefully (doesn't crash)

### Fix 2: Explicit Runtime Specification

**Files**:
- `app/board/page.tsx`
- `app/board/[id]/page.tsx`
- `app/sitemap.ts`
- `app/api/diag/public-board/route.ts`

**Change**: Added at top of each file:
```typescript
export const runtime = 'nodejs'
```

**Benefits**:
- Forces routes to use Node.js runtime on Vercel
- Enables Neon serverless connection to work
- Ensures database queries execute properly

### Fix 3: Diagnostic Endpoint

**File**: `app/api/diag/public-board/route.ts` (NEW)

**What It Does**:
```json
{
  "timestamp": "2024-01-29T10:30:00Z",
  "runtime": "nodejs",
  "dbConnection": "ok|fail",
  "postsCount": 5,
  "samplePostId": "uuid-here",
  "canFetchKnownId": true,
  "errorMessage": "optional error description"
}
```

**Benefits**:
- Test database connectivity without exposing sensitive data
- Check post count instantly
- Get sample post ID for testing detail pages
- No post bodies or credentials returned (secure)
- Helps diagnose issues in 30 seconds

**Usage**:
```bash
curl https://your-site.com/api/diag/public-board
# Returns diagnostics in JSON format
```

### Fix 4: Production Verification Script

**File**: `scripts/verify-production.mjs` (NEW)

**Tests**:
1. `/robots.txt` returns 200
2. `/sitemap.xml` returns 200 with valid XML
3. `/board` shows posts (not "Total 0")
4. `/api/diag/public-board` shows `dbConnection: ok`
5. `/board/{knownId}` renders with content

**Usage**:
```bash
# Test local development
BASE_URL=http://localhost:3000 node scripts/verify-production.mjs

# Test production
BASE_URL=https://your-site.com node scripts/verify-production.mjs
```

**Output Example**:
```
🔍 Production Verification Report
📍 Base URL: https://interprep.academy
⏰ Timestamp: 2024-01-29T10:30:00Z

1️⃣  Testing /robots.txt
   ✅ Status 200, 234 bytes

2️⃣  Testing /sitemap.xml
   ✅ Status 200, valid XML
   📊 Found 45 URLs

3️⃣  Testing /board page
   ✅ Status 200, posts data visible

4️⃣  Testing /api/diag/public-board (diagnostics)
   ✅ Endpoint working
   📊 DB Connection: ok
   📝 Posts Count: 12

5️⃣  Testing /board/{id} (post detail)
   ✅ Status 200, post content rendered

📋 Summary: 5/5 checks passed (100%)
```

---

## 🔧 Troubleshooting Guide

### Symptom: "Total 0 / No posts" on /board

**Step 1**: Check diagnostics endpoint
```bash
curl https://your-site.com/api/diag/public-board | jq .
```

**Step 2**: Look for `dbConnection` status
- `ok`: Database connected, but posts table is empty
- `fail`: Database connection failed

**Step 3**: If `dbConnection: fail`, verify:
```bash
# Check environment variable exists
echo $DATABASE_URL  # Should show connection string

# Check it's valid format
# Should be: postgresql://user:password@host:port/db?ssl=true
```

**Step 4**: Check production logs for `[board]` messages
```bash
# On Vercel: View Deployment → Logs → Runtime Logs
# Should see: [board] getPosts failed: { error: "...", page: 1, ... }
```

### Symptom: "/board/{id} shows 'Post not found' but posts exist on /board"

**Likely Cause**: Post with that UUID doesn't exist or fetch failed

**Debug**:
1. Check `/api/diag/public-board?id={uuid}` - includes `canFetchKnownId` field
2. If `canFetchKnownId: false` - that post doesn't exist or fetch failed
3. Check `[board] getPostById failed:` logs

### Symptom: "/sitemap.xml returns 404"

**Possible Causes**:
1. Route not deployed (redeploy needed)
2. Middleware intercepting the route (check `middleware.ts`)
3. Vercel build step failed (check build logs)

**Debug**:
1. Check if file exists locally: `app/sitemap.ts` ✓
2. Try accessing with `curl -v https://your-site.com/sitemap.xml`
3. Check response headers for `X-Deployment-ID` (confirms it's from Vercel)
4. Check production logs for `[sitemap]` messages

---

## 📊 Log Message Reference

All database and routing logs now use standardized prefixes:

### Board Operations
```
[board] getPosts success: { page: 1, pageSize: 10, totalCount: 5, sort: 'latest' }
[board] getPosts failed: { error: "connection timeout", sort: 'latest', page: 1 }
[board] getPostById success: { id: 'uuid-here' }
[board] getPostById: post not found: { id: 'uuid-here' }
[board] getPostById failed: { error: "connection timeout", id: 'uuid-here' }
```

### Sitemap Operations
```
[sitemap] Successfully fetched posts: { count: 12 }
[sitemap] Failed to get posts: { error: "connection timeout" }
```

### Database Initialization
```
[board] Database initialized successfully
[board] Database initialization error: connection timeout
```

### Diagnostic Endpoint
- Located at `/api/diag/public-board`
- Returns comprehensive connection status
- Safe to expose (no sensitive data returned)

---

## 🎯 Verification Steps

After deploying these fixes:

### 1. Local Testing
```bash
npm run dev
BASE_URL=http://localhost:3000 node scripts/verify-production.mjs
```

### 2. Staging Testing (if available)
```bash
BASE_URL=https://staging.interprep.academy node scripts/verify-production.mjs
```

### 3. Production Testing
```bash
BASE_URL=https://interprep.academy node scripts/verify-production.mjs
```

### 4. Manual Checks
- ✅ Visit `/board` → should show posts, not "Total 0"
- ✅ Visit `/board/{any-post-uuid}` → should show post content
- ✅ Visit `/sitemap.xml` → should return valid XML with status 200
- ✅ Visit `/api/diag/public-board` → should return `{"dbConnection": "ok", "postsCount": ...}`

---

## 🚀 Deployment Checklist

- [ ] All files with DB access have `export const runtime = 'nodejs'`
- [ ] DATABASE_URL environment variable is set in production
- [ ] Posts table exists and has data
- [ ] Run production verification script and confirm all checks pass
- [ ] Monitor Vercel logs for any `[board]` errors over 24 hours
- [ ] Confirm `/board` shows correct post count
- [ ] Confirm `/board/{id}` works for known post IDs
- [ ] Confirm `/sitemap.xml` returns valid XML

---

## 📝 Files Modified

### Database Layer
- **`lib/db.ts`**
  - Enhanced error logging in `getPosts()` and `getPostById()`
  - Added context to error messages
  - Changed log prefix from `[v0]` to `[board]`

### Server Components
- **`app/board/page.tsx`** - Added `export const runtime = 'nodejs'`
- **`app/board/[id]/page.tsx`** - Added `export const runtime = 'nodejs'`
- **`app/sitemap.ts`** - Added `export const runtime = 'nodejs'` and enhanced logging

### New Files
- **`app/api/diag/public-board/route.ts`** - Safe diagnostic endpoint
- **`scripts/verify-production.mjs`** - Automated verification script

---

## 🔐 Security Notes

### Diagnostic Endpoint (`/api/diag/public-board`)
- ✅ Safe to expose publicly - no sensitive data returned
- ✅ No database credentials
- ✅ No post content
- ✅ Only returns counts and connection status
- ✅ Error messages truncated to 100 chars

### Production Logs
- ✅ Log messages use structured format with `[board]` prefix
- ✅ Error messages are safe (no credentials)
- ⚠️ Avoid logging full query strings if they contain user data
- ⚠️ DATABASE_URL itself is never logged

---

## 📚 Additional Resources

- Next.js Runtime: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#runtime
- Neon Serverless: https://neon.tech/docs/guides/serverless
- Vercel Deployment: https://vercel.com/docs/concepts/deployments/environments

---

**Last Updated**: 2024-01-29
**Status**: All fixes implemented and tested locally
**Next Step**: Deploy to production and run verification script

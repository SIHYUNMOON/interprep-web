# Quick Testing Guide - Bot Visibility Fix

## Run These Commands to Verify the Fix

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Diagnostic Endpoint (in another terminal)
```bash
# Test with human UA
curl http://localhost:3000/api/diag/board-visibility

# Test with bot UA
curl -H "User-Agent: Googlebot/2.1" http://localhost:3000/api/diag/board-visibility
```

**Expected Result**: Both should return JSON with `postsCount > 0`

### 3. Run Bot Comparison Test
```bash
npm run diag:bot
```

**Expected Result**: Exit code 0, message "✅ No issues detected"

### 4. Verify Sitemap
```bash
npm run verify:sitemap
```

**Expected Result**: All checks pass ✅

### 5. Check Board HTML Contains Links
```bash
curl http://localhost:3000/board > board.html
grep -c 'href="/board/' board.html
```

**Expected Result**: Number > 0 (should see multiple board post links)

### 6. Check Board HTML with Bot UA
```bash
curl -H "User-Agent: Googlebot/2.1" http://localhost:3000/board | grep -o 'href="/board/[^"]*"' | head -5
```

**Expected Result**: Should see URLs like `href="/board/uuid-here"`

## Quick Visual Check

1. Open http://localhost:3000/board in browser
2. View page source (Ctrl+U or Cmd+U)
3. Search for "게시물 링크" or search for `href="/board/`
4. Should see links to board posts in HTML source

## Production Testing (After Deploy)

```bash
# Replace with your production URL
BASE_URL=https://interprep.academy npm run diag:bot
BASE_URL=https://interprep.academy npm run verify:sitemap
```

## Common Issues

### "postsCount: 0" in diagnostic
- Check DATABASE_URL is set
- Verify posts exist in database
- Check db.ts getPosts() function

### "No post links found" in HTML
- Check that initialPosts is being passed to BoardClient
- Verify SSR is working (not falling back to client-only)
- Check console for errors

### Sitemap returns 404
- Verify app/sitemap.ts exists
- Check Next.js version supports App Router sitemap
- Restart dev server

### Scripts fail with "command not found"
- Make sure you're in project root
- Check scripts/ directory exists
- Run `chmod +x scripts/*.mjs` on Unix systems

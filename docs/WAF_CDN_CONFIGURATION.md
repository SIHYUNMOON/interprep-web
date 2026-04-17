# WAF / CDN / Bot Protection Configuration Guide

## Overview
Sitemap and robots.txt files must be accessible to ALL requesters (browsers, crawlers, AI tools) without any bot challenges, rate limiting, or security checks.

## Critical Paths (MUST ALLOWLIST)
- `/robots.txt`
- `/sitemap.xml`
- `/sitemap-pages.xml`
- `/sitemap-board.xml`

## Vercel Firewall Configuration

### Step 1: Disable Firewall for SEO Paths
If using Vercel's built-in firewall:

1. Go to Vercel Dashboard → Project Settings → Security
2. Under "Firewall Rules", add allowlist rule:
   ```
   Path matches: /robots.txt | /sitemap.xml | /sitemap-pages.xml | /sitemap-board.xml
   Action: Allow
   ```
3. Ensure no "Bot" or "Challenge" rules apply to these paths

### Step 2: Rate Limiting Exclusion
Ensure rate limiting is NOT applied:
- These paths: `/robots.txt`, `/sitemap.xml`, `/sitemap-pages.xml`, `/sitemap-board.xml`
- Status: **Excluded** from any rate limiting rules

## Cloudflare Configuration (if used as CDN)

### Firewall Rules
```
(cf.client.bot and 
(http.request.uri.path matches "/(robots\.txt|sitemap.*\.xml)"))

→ Allow
```

### WAF Rules
Ensure these paths are NOT:
- Challenged
- Rate-limited
- Blocked by any rule

### Page Rules
```
URL: https://interprep.academy/robots.txt
URL: https://interprep.academy/sitemap*.xml

Cache Level: Cache Everything
Browser Cache TTL: 1 hour
```

## AWS CloudFront Configuration (if used)

### Origin Access Control
Ensure `/public/*` is accessible without authentication.

### Behavior Rules
For pattern: `/robots.txt`, `/sitemap*.xml`
- Origin: S3 bucket or load balancer serving /public
- Cache TTL: 3600 seconds
- Compress: Yes
- Allowed Methods: GET, HEAD
- Viewer Protocol Policy: Redirect HTTP to HTTPS

### CloudFront WAF (if enabled)
Add rule to allow these paths:
```
Rule Name: AllowSitemaps
Priority: 1 (highest)
Statement:
  URIPath contains: "/robots.txt" OR URIPath matches "/sitemap.*\.xml"
  Action: Allow
```

## nginx Configuration (if hosting)

```nginx
location ~ ^/(robots\.txt|sitemap.*\.xml)$ {
    access_log off;  # optional: reduce logging
    log_not_found off;
    
    # Do NOT apply any bot protection
    # Do NOT require authentication
    # Serve directly from /public
    expires 1h;
    add_header Cache-Control "public, immutable, max-age=3600";
}
```

## Apache Configuration (if hosting)

```apache
<Files ~ "^robots\.txt|sitemap.*\.xml$">
    # Bypass all mod_security rules
    SecRuleEngine Off
    
    # Disable access restrictions
    Allow from all
    
    # Set caching headers
    Header set Cache-Control "public, immutable, max-age=3600"
    Header set X-Content-Type-Options "nosniff"
</Files>
```

## General WAF/Bot Protection Rules

### MUST ALLOWLIST:
- `/robots.txt`
- `/sitemap.xml`
- `/sitemap-pages.xml`
- `/sitemap-board.xml`

### MUST DISABLE for these paths:
- ❌ Bot detection challenges
- ❌ CAPTCHA
- ❌ Rate limiting
- ❌ IP reputation checks
- ❌ User-Agent blocking
- ❌ Geo-blocking (allow all countries)
- ❌ DDoS protection (if it blocks legitimate crawlers)

### ALLOW these User-Agents:
- `*` (allow all)
- Specifically: curl, wget, python-requests, Googlebot, bingbot, etc.

### HEADERS to NEVER block:
- `User-Agent: *` (any value)
- `Accept: application/json` (or any Accept header)
- `Accept-Encoding: gzip, deflate` (standard compression)

## Testing Commands (Post-Deployment)

```bash
# Test without User-Agent
curl -I https://interprep.academy/robots.txt

# Test with different User-Agents
curl -I -H "User-Agent: Googlebot/2.1" https://interprep.academy/sitemap.xml
curl -I -H "User-Agent: python-requests/2.31.0" https://interprep.academy/sitemap-board.xml

# Test with different Accept headers
curl -I -H "Accept: application/json" https://interprep.academy/sitemap.xml

# Expected response for ALL:
# HTTP/1.1 200 OK
# Content-Type: application/xml
# Cache-Control: public, immutable, max-age=3600
```

## Debugging HTTP 400/403

If requests still return 400/403:

1. **Check WAF logs:**
   - Vercel: Dashboard → Logs
   - Cloudflare: Security → Events
   - AWS: CloudFront → Monitoring

2. **Look for:**
   - "Bot Challenge" messages
   - "Rate Limit Exceeded"
   - "Access Denied" rules
   - "IP Reputation" blocks

3. **Fix:**
   - Add explicit allowlist rule for the path
   - Disable bot detection for this path
   - Verify middleware is not interfering (check Next.js logs)

## Middleware Bypass (Next.js)

Already configured in `middleware.ts`:
- `/robots.txt` → returns immediately, bypasses all middleware logic
- `/sitemap*.xml` → returns immediately, bypasses all middleware logic
- `config.matcher` excludes these paths to prevent re-execution

## Vercel Deployment Checklist

- [ ] `/public/robots.txt` exists
- [ ] `/public/sitemap.xml` exists
- [ ] `/public/sitemap-pages.xml` exists
- [ ] `/public/sitemap-board.xml` exists
- [ ] Vercel Firewall has allowlist rule for these paths
- [ ] No rate limiting rules apply to these paths
- [ ] Next.js middleware excludes these paths
- [ ] `vercel.json` headers configured (if using)
- [ ] Test: `curl https://interprep.academy/robots.txt` returns 200
- [ ] Test: `curl https://interprep.academy/sitemap.xml` returns 200
- [ ] AI tools can fetch without 400/403 errors

# Copilot Prompt (EN) — Verify & harden sitemap.ts (6-point checklist)

## Context
We already have an implemented sitemap using Next.js App Router:
  app/sitemap.ts

The sitemap:
- Uses MetadataRoute.Sitemap
- Fetches dynamic board posts from DB
- Falls back to static-only sitemap on DB failure

However, we must verify and harden it against subtle production/SEO issues.

Your task:
1) CHECK the 6 acceptance points below
2) If any point is NOT satisfied, FIX it correctly
3) Keep changes minimal and production-safe

---

## Acceptance Checklist (ALL must pass)

### 1) Sitemap file location & routing

CHECK:
- sitemap implementation exists at:
    app/sitemap.ts OR src/app/sitemap.ts
- /sitemap.xml is routed ONLY by App Router

FAIL IF:
- sitemap.ts is outside app/
- public/sitemap.xml exists
- pages/sitemap.xml.ts exists
- any rewrite/redirect intercepts /sitemap.xml

FIX:
- Move sitemap to correct location
- Remove conflicting files or rewrites

---

### 2) Runtime correctness (Node.js)

CHECK:
- sitemap.ts explicitly exports:
    export const runtime = "nodejs";

FAIL IF:
- runtime is missing
- runtime is "edge"

FIX:
- Add or correct runtime export

---

### 3) BASE_URL correctness (NO hardcoding)

CHECK:
- Sitemap does NOT hardcode a single domain like:
    https://interprep.academy

FAIL IF:
- BASE_URL is hardcoded

FIX:
- Derive base URL dynamically using request headers:
    import { headers } from "next/headers";
    const host = headers().get("host");
    const protocol = process.env.VERCEL ? "https" : "http";
    const BASE_URL = `${protocol}://${host}`;

This ensures:
- Preview / Production / Custom domains work correctly

---

### 4) lastModified semantics (SEO-safe)

CHECK:
- Static pages do NOT use new Date() on every sitemap generation

FAIL IF:
- lastModified for static pages is always new Date()

FIX:
- Either:
  a) Remove lastModified for static pages entirely, OR
  b) Use a fixed value (e.g. build time constant)

Rationale:
- Avoid signaling "page changed" every hour for static content

---

### 5) Dynamic post lastModified safety

CHECK:
- Post entries safely compute lastModified

FAIL IF:
- new Date(undefined)
- new Date("") possible

FIX:
- Use a safe fallback:
    const last =
      post.updated_at ??
      post.created_at ??
      new Date().toISOString();

- Ensure new Date(last) is always valid

---

### 6) DB query correctness & failure behavior

CHECK:
- getPosts() call signature matches implementation
- pageSize is large enough to include ALL posts
- result.ok === false does NOT throw
- Sitemap STILL returns 200 OK with static pages only

FAIL IF:
- DB failure causes sitemap to error or return empty array
- Incorrect argument order causes silent 0 posts

FIX:
- Correct getPosts arguments
- Wrap DB call defensively
- Log only:
    console.log("[sitemap] fetched posts", { count })
    console.log("[sitemap] db_unavailable, static-only sitemap")

DO NOT:
- Log DATABASE_URL
- Throw errors from sitemap()

---

## Execution Instructions

1) Inspect current sitemap.ts
2) Evaluate ALL 6 checklist items
3) Apply fixes ONLY where necessary
4) Keep existing URL list and priorities unless incorrect
5) Ensure code builds without TypeScript errors

---

## Verification (must succeed)

After changes:

1) GET /sitemap.xml → 200 OK
2) XML root = <urlset>
3) Contains:
   - /
   - /board
   - /board/archive
   - /board/{uuid} (all posts)
4) Works in:
   - local dev
   - Vercel preview
   - Vercel production

---

## Output

Deliver:
- Updated sitemap.ts (if changes needed)
- Short summary of which checklist items were fixed

Do NOT add new features.
Do NOT change unrelated files.

Goal:
Production-grade sitemap with zero 404 risk and SEO-safe semantics.

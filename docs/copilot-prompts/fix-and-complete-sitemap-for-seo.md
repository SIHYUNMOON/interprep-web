# Copilot Prompt (EN) — Fix sitemap.xml 404 and complete SEO-ready sitemap for AI crawling

## Context
Current state:
- The site has ~82 board posts at /board/{uuid}
- Each post detail page is SSR and includes full body content (PASS)
- A new discovery page /board/archive is being added to expose ALL post links (PASS)
- robots.txt points to /sitemap.xml
- BUT /sitemap.xml currently returns 404 (SEO + crawling disadvantage)

Goal:
- Fix the 404 error for /sitemap.xml
- Implement a proper, production-grade sitemap
- Ensure ALL important URLs (static + board posts) are discoverable by AI and search engines

Constraints:
- App Router (Next.js)
- No Pages Router sitemap
- No duplicate or conflicting sitemap sources
- Must work in production on Vercel

---

## Step 1 — Ensure correct sitemap location (App Router standard)

Create or update:
  app/sitemap.ts

IMPORTANT:
- There must be ONLY ONE sitemap source.
- Remove /public/sitemap.xml if it exists.
- Remove any pages/sitemap.xml.ts if it exists.
- Ensure no rewrite/redirect intercepts /sitemap.xml.

---

## Step 2 — Basic sitemap structure (required)

In app/sitemap.ts:

- Export default function sitemap(): MetadataRoute.Sitemap
- Add:
    export const runtime = "nodejs";
    export const revalidate = 3600;

This guarantees:
- Node runtime for DB access
- Sitemap regenerates hourly (fresh but not expensive)

---

## Step 3 — Include ALL static pages

Add static URLs such as:

- /
- /about
- /about/philosophy
- /team
- /location
- /sat
- /presat
- /toefl
- /art-english
- /ipass
- /board
- /board/archive
- /faq
- /contact

For each static entry:
- url
- lastModified: new Date()
- changeFrequency: "monthly"
- priority: 0.5 ~ 0.8 depending on importance

---

## Step 4 — Include ALL board posts dynamically

Fetch all posts on the server:

- Reuse the SAME DB helper used elsewhere (e.g. getPosts)
- pageSize large enough to cover all posts (e.g. 1000)
- No pagination

For each post:
- url: `/board/${post.id}`
- lastModified: post.updated_at ?? post.created_at
- changeFrequency: "never" or "yearly"
- priority: 0.6

IMPORTANT:
- Do NOT throw on DB failure.
- If DB is unavailable:
  - Return sitemap with static URLs only.
  - Sitemap must still return 200 OK.

This avoids:
- sitemap.xml 500 errors
- Search engine penalties

---

## Step 5 — Error handling & logging (safe)

Add minimal logging:

console.log("[sitemap] fetched posts", { count });

On DB failure:

console.log("[sitemap] db_unavailable, returning static-only sitemap");

Rules:
- Do NOT log DATABASE_URL
- Do NOT expose stack traces

---

## Step 6 — robots.txt verification

Ensure robots.txt contains:

User-agent: *
Allow: /
Sitemap: https://<PRIMARY_DOMAIN>/sitemap.xml

Where <PRIMARY_DOMAIN> is the canonical domain.

If multiple domains exist:
- robots.txt should reference the canonical one only.

---

## Step 7 — Verification checklist (must pass)

After implementation (local or prod):

1) Open:
   https://<domain>/sitemap.xml
   → Status 200 OK
   → <urlset> root exists

2) Confirm sitemap contains:
   - /board
   - /board/archive
   - /board/{uuid} entries for ALL posts (82)

3) Disable JavaScript and reload sitemap.xml
   → Still visible (pure XML)

4) Run:
   curl https://<domain>/sitemap.xml
   → No 404, no 500

---

## Step 8 — (Optional) Add verification script

Create:
  scripts/verify-sitemap.mjs

Script checks:
- GET /sitemap.xml → 200
- XML contains <urlset>
- Contains at least one /board/{uuid}
- Contains /board/archive

Add npm script:
  "verify:sitemap": "node scripts/verify-sitemap.mjs"

---

## Non-goals (do NOT do these)

- Do NOT split sitemap into multiple files yet
- Do NOT block indexing of /board/archive
- Do NOT include query-string URLs
- Do NOT include API routes

---

## Expected Outcome

After this change:
- /sitemap.xml no longer returns 404
- All 82 board posts are explicitly listed
- AI and search engines can discover every post reliably
- Archive + sitemap together provide maximum crawl coverage
- SEO foundation is complete and standards-compliant

This satisfies:
"All published board posts (titles and full bodies) are actively crawlable and indexable by AI systems."

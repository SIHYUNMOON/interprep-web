# Production Fix Pre‑Deploy Check (2026‑02‑02)

## A) Router structure & server entry points

- **Router**: App Router detected (app/ exists with layout.tsx).
- **Server entry files in scope**:
  - Board list page: [app/board/page.tsx](../app/board/page.tsx)
  - Board detail page: [app/board/[id]/page.tsx](../app/board/[id]/page.tsx)
  - Sitemap: [app/sitemap.ts](../app/sitemap.ts)
  - Diagnostic endpoint: [app/api/diag/public-board/route.ts](../app/api/diag/public-board/route.ts)
  - DB module: [lib/db.ts](../lib/db.ts)

## B) Check #1 — Node runtime on server entry files

| Entry file | Server entry? | runtime = nodejs | Evidence | Status |
|---|---|---|---|---|
| app/board/page.tsx | Yes (page) | Yes | [app/board/page.tsx](../app/board/page.tsx#L5) | PASS |
| app/board/[id]/page.tsx | Yes (page) | Yes | [app/board/[id]/page.tsx](../app/board/[id]/page.tsx#L6) | PASS |
| app/sitemap.ts | Yes (sitemap) | Yes | [app/sitemap.ts](../app/sitemap.ts#L3) | PASS |
| app/api/diag/public-board/route.ts | Yes (route) | Yes | [app/api/diag/public-board/route.ts](../app/api/diag/public-board/route.ts#L3) | PASS |

- **Edge runtime check**: No `runtime = "edge"` found in app routes (grep). **PASS**.

## C) Check #2 — DB failure separated from empty/not found

**Implementation**
- DB functions return a discriminated result type:
  - `DbResult<T> = { ok: true; data: T } | { ok: false; error: 'db_unavailable' }` in [lib/db.ts](../lib/db.ts#L71-L88).
- `getPosts()` and `getPostById()` return `ok:false` on DB failure (including SIMULATE_DB_FAIL) and log structured errors:
  - [lib/db.ts](../lib/db.ts#L89-L115) and [lib/db.ts](../lib/db.ts#L187-L215).

**Board list page behavior**
- If DB unavailable, render outage message instead of empty state:
  - [app/board/page.tsx](../app/board/page.tsx#L102-L116).
- Client-side fetch also renders outage message, not “게시물이 없습니다.”:
  - [app/board/client.tsx](../app/board/client.tsx#L287-L306).

**Board detail page behavior**
- DB unavailable → outage message (not notFound):
  - Server entry sets error state: [app/board/[id]/page.tsx](../app/board/[id]/page.tsx#L60-L83).
  - Client renders outage message: [app/board/[id]/client.tsx](../app/board/[id]/client.tsx#L176-L205).
- Post missing → `notFound()` on server entry: [app/board/[id]/page.tsx](../app/board/[id]/page.tsx#L73-L78).

**API semantics**
- `/api/posts` returns **503** on db_unavailable, normal payload on success:
  - [app/api/posts/route.ts](../app/api/posts/route.ts#L18-L30).
- `/api/posts/[id]` returns **503** on db_unavailable, **404** for not found:
  - [app/api/posts/[id]/route.ts](../app/api/posts/[id]/route.ts#L13-L32).

**Status**: PASS

## D) Check #3 — Sitemap routing path and conflicts

- Sitemap exists at App Router path: [app/sitemap.ts](../app/sitemap.ts#L1-L25).
- No rewrites or middleware intercepts `/sitemap.xml`:
  - [next.config.mjs](../next.config.mjs#L1-L15) has no rewrites.
- No conflicting files found (`public/sitemap.xml`, `pages/sitemap.xml.ts`, `app/sitemap.xml/route.ts`).

**Status**: PASS

## E) Verification scripts

- `npm run verify:sitemap` → uses `scripts/verify-sitemap-200.mjs`.
- `node scripts/verify-sitemap-200.mjs` → validates 200 + <urlset + board URLs.
- `node scripts/verify-db-failure-semantics.mjs` → validates outage messaging with `SIMULATE_DB_FAIL=1`.

## Fixes applied in this pass

- Added `DbResult` and db‑unavailable semantics in [lib/db.ts](../lib/db.ts).
- Outage UI state for `/board` and `/board/[id]` (server + client).
- API routes return **503** for db_unavailable.
- Added verification scripts:
  - [scripts/verify-sitemap-200.mjs](../scripts/verify-sitemap-200.mjs)
  - [scripts/verify-db-failure-semantics.mjs](../scripts/verify-db-failure-semantics.mjs)
- Updated `verify:sitemap` script in [package.json](../package.json#L6-L15).

## Final status

✅ Check #1: PASS  
✅ Check #2: PASS  
✅ Check #3: PASS  

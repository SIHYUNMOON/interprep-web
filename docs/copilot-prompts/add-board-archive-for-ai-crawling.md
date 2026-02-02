# Copilot Prompt (EN) — Add /board/archive to ensure full AI crawling of all post titles & bodies

## Context
Current situation:
- /board shows only 10 posts per page (9 pages total).
- AI bots can reliably see the first page (10 titles).
- Each post detail page (/board/{uuid}) is already SSR and includes full body content (PASS).

Problem:
- We cannot reliably assume AI crawlers will paginate through all 9 pages.
- Goal is to ensure ALL 82 posts are *discoverable* and then *fully readable* by AI.

We want a solution that:
- Does NOT harm user UX
- Does NOT remove pagination
- Does NOT add bot-only or hidden content
- Uses standard HTML that humans *could* access

Chosen approach:
OPTION A — Add a server-rendered archive index page.

---

## Goal
Create a new route:

  /board/archive

This page must:
- Server-render a complete list of ALL posts (no pagination)
- Include a real <a href="/board/{uuid}"> link for every post
- Be crawlable without JavaScript
- Contain NO post bodies (titles + minimal metadata only)

This page is for *discovery*, not reading.
Reading happens on existing /board/{uuid} pages.

---

## Step-by-step instructions

### 1) Create a new App Router page

Create:
  app/board/archive/page.tsx
  (or src/app/board/archive/page.tsx depending on repo structure)

Requirements:
- This MUST be a Server Component (NO "use client")
- Add:
    export const runtime = "nodejs";
    export const revalidate = 3600;

---

### 2) Fetch ALL posts on the server

In page.tsx:
- Import the same DB helper used elsewhere (e.g. getPosts)
- Fetch all posts in one query:
    - pageSize = large enough to cover all posts (e.g. 1000)
    - sort = latest
    - no category filter

Important:
- Reuse existing DB code (do NOT duplicate DB logic)
- Handle db_unavailable using the same DbResult pattern:
    - If DB fails, render a simple outage message (same wording as elsewhere)

---

### 3) Render a simple, crawl-friendly list

Render semantic HTML only:

<main>
  <h1>Board Archive</h1>
  <ul>
    <li>
      <a href="/board/{uuid}">Post title</a>
      <span>Category</span>
      <time datetime="YYYY-MM-DD">YYYY.MM.DD</time>
    </li>
    ...
  </ul>
</main>

Rules:
- Use real <a href>, NOT onClick
- No infinite scroll
- No client-side pagination
- Keep layout lightweight (82 items is fine)

---

### 4) Metadata for AI & SEO

Add generateMetadata() to the archive page:

- title: "Board Archive | Interprep"
- description: "Complete archive of all Interprep board posts and articles."

Noindex?
- Do NOT add noindex.
- This page is allowed to be indexed.

---

### 5) Light internal linking (optional but recommended)

Add a small text link:
- From /board footer: "View full archive"
- OR from site footer only

Keep it subtle.
Do NOT add to main navigation if product does not want it visible.

---

### 6) Verification checklist (must pass)

After implementation, confirm locally:

1) view-source:http://localhost:PORT/board/archive
   - Shows ALL 82 <a href="/board/{uuid}"> links

2) Disable JavaScript and reload /board/archive
   - Links still visible

3) Pick a random UUID from archive and open:
   /board/{uuid}
   - Full post body renders (already implemented)

This guarantees:
- AI can discover all posts via /board/archive
- AI can read all bodies via existing SSR detail pages

---

## Non-goals (do NOT do these)

- Do NOT remove pagination from /board
- Do NOT dump full post bodies into archive
- Do NOT add hidden/sr-only content
- Do NOT rely on JavaScript for archive rendering
- Do NOT create a bot-only route

---

## Outcome

After this change:
- AI bots can reliably discover 100% of post URLs
- Each post body is already SSR-readable
- Pagination UX remains unchanged for users
- No sitemap dependency (though sitemap can be added later for extra strength)

This satisfies the requirement:
"All 82 post titles and bodies are actively crawlable and usable by AI systems."

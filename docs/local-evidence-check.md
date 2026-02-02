# Local Evidence Check (2026‑02‑02)

This workflow **proves** the three evidence checks by running the dev server and making HTTP requests.

## 1) Evidence A + C (DB OK)

### Step 1 — start dev server
```bash
npm run dev:3001
```

### Step 2 — verify
```bash
npm run verify:local
```

### Expected results
- Script prints **PASS** for Evidence A and C.
- Dev server logs show:
  - `[board] getPosts success`
  - `[board] getPostById success`
  - `[sitemap] fetched posts`

If any are missing, the evidence fails.

---

## 2) Evidence B (SIMULATE_DB_FAIL=1)

### Step 1 — start dev server with DB failure simulation
```bash
npm run dev:faildb
```

### Step 2 — verify
```bash
npm run verify:local
```

### Expected results
- Script prints **PASS** for Evidence B.
- /board and /board/{uuid} **do not** show:
  - “게시물이 없습니다”
  - “전체 0”
  - “not found” / “찾을 수 없습니다”
- Both **do** show the outage marker: `SERVICE_TEMP_UNAVAILABLE`.

---

## Notes

- Base URL defaults to `http://localhost:3001`.
- You can override it with:
```bash
BASE_URL=http://localhost:3001 npm run verify:local
```

## Related scripts

- `npm run dev:3001`
- `npm run dev:faildb`
- `npm run verify:local`
- `npm run verify:sitemap`
- `node scripts/verify-db-failure-semantics.mjs`

## Troubleshooting

If Evidence A fails:
- Confirm dev logs show required markers.
- Check [app/board/page.tsx](../app/board/page.tsx) and [app/sitemap.ts](../app/sitemap.ts).

If Evidence B fails:
- Confirm `SIMULATE_DB_FAIL=1` is set.
- Verify outage marker appears in HTML.

If Evidence C fails:
- Ensure `/sitemap.xml` returns 200 and contains `<urlset>`.

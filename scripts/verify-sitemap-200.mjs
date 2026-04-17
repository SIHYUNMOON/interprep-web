#!/usr/bin/env node

const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

async function fetchJson(url) {
  const res = await fetch(url);
  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = null;
  }
  return { res, text, data };
}

async function run() {
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  const { res, text } = await fetchJson(sitemapUrl);

  if (res.status !== 200) {
    console.error(`FAIL: /sitemap.xml returned ${res.status}`);
    process.exit(1);
  }

  if (!text.includes('<urlset')) {
    console.error('FAIL: /sitemap.xml missing <urlset>');
    process.exit(1);
  }

  if (!text.includes('/board')) {
    console.error('FAIL: /sitemap.xml missing /board entry');
    process.exit(1);
  }

  // If DB is available and posts exist, assert at least one /board/ URL
  const diagUrl = `${baseUrl}/api/diag/public-board`;
  const diag = await fetchJson(diagUrl);
  if (diag.data && diag.data.dbConnection === 'ok' && (diag.data.postsCount || 0) > 0) {
    if (!text.includes('/board/')) {
      console.error('FAIL: /sitemap.xml missing /board/ post entries while DB is ok');
      process.exit(1);
    }
  }

  console.log('PASS: /sitemap.xml is 200 and contains expected URLs');
}

run().catch((error) => {
  console.error('FAIL:', error?.message || error);
  process.exit(1);
});

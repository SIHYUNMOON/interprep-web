#!/usr/bin/env node

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const OUTAGE_MARKER = 'SERVICE_TEMP_UNAVAILABLE';

async function fetchText(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  const text = await res.text();
  return { res, text };
}

async function fetchJson(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = null;
  }
  return { res, text, data };
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

async function getSamplePostId() {
  const diag = await fetchJson('/api/diag/public-board');
  if (diag.data && diag.data.samplePostId) {
    return diag.data.samplePostId;
  }

  const sitemap = await fetchText('/sitemap.xml');
  const match = sitemap.text.match(/\/board\/([0-9a-fA-F-]{36})/);
  return match ? match[1] : null;
}

async function evidenceA() {
  const board = await fetchText('/board');
  assert(board.res.status === 200, `/board returned ${board.res.status}`);

  const sitemap = await fetchText('/sitemap.xml');
  assert(sitemap.res.status === 200, `/sitemap.xml returned ${sitemap.res.status}`);

  const sampleId = await getSamplePostId();
  assert(!!sampleId, 'No sample post ID found for /board/{uuid}');

  const post = await fetchText(`/board/${sampleId}`);
  assert(post.res.status === 200, `/board/{uuid} returned ${post.res.status}`);

  const runtimeHeader = board.res.headers.get('x-runtime') || board.res.headers.get('x-nextjs-runtime');
  if (runtimeHeader) {
    console.log(`Runtime header detected: ${runtimeHeader}`);
  } else {
    console.log('No runtime header detected. Verify terminal logs for runtime evidence.');
  }

  console.log('PASS: Evidence A requests completed. Check terminal logs for:');
  console.log('  [board] getPosts success');
  console.log('  [board] getPostById success');
  console.log('  [sitemap] fetched posts');
}

async function evidenceB() {
  const board = await fetchText('/board');
  assert(board.res.status === 200, `/board returned ${board.res.status}`);

  assert(!board.text.includes('게시물이 없습니다'), '/board shows "게시물이 없습니다" during DB failure');
  assert(!board.text.includes('전체 0'), '/board shows "전체 0" during DB failure');
  assert(!board.text.includes('Total 0'), '/board shows "Total 0" during DB failure');
  assert(board.text.includes(OUTAGE_MARKER), '/board missing outage marker');

  const fakeId = '00000000-0000-0000-0000-000000000000';
  const post = await fetchText(`/board/${fakeId}`);
  assert(post.res.status === 200, `/board/{uuid} returned ${post.res.status}`);
  assert(!post.text.includes('not found'), '/board/{uuid} shows "not found" during DB failure');
  assert(!post.text.includes('찾을 수 없습니다'), '/board/{uuid} shows "찾을 수 없습니다" during DB failure');
  assert(post.text.includes(OUTAGE_MARKER), '/board/{uuid} missing outage marker');

  console.log('PASS: Evidence B outage semantics verified.');
}

async function evidenceC() {
  const sitemap = await fetchText('/sitemap.xml');
  assert(sitemap.res.status === 200, `/sitemap.xml returned ${sitemap.res.status}`);
  assert(sitemap.text.includes('<urlset'), 'Missing <urlset in /sitemap.xml');
  assert(sitemap.text.includes('/board'), 'Missing /board entry in /sitemap.xml');

  const diag = await fetchJson('/api/diag/public-board');
  if (diag.data && diag.data.dbConnection === 'ok' && (diag.data.postsCount || 0) > 0) {
    assert(sitemap.text.includes('/board/'), 'Missing /board/ post entry in /sitemap.xml while DB is ok');
  }

  console.log('PASS: Evidence C sitemap checks verified.');
}

async function run() {
  console.log(`BASE_URL=${BASE_URL}`);

  if (process.env.SIMULATE_DB_FAIL === '1') {
    console.log('Running Evidence B (SIMULATE_DB_FAIL=1)');
    await evidenceB();
  } else {
    console.log('Running Evidence A and C (DB OK)');
    await evidenceA();
    await evidenceC();
  }

  console.log('PASS: Local evidence verification completed.');
}

run().catch((error) => {
  console.error('FAIL:', error?.message || error);
  process.exit(1);
});

#!/usr/bin/env node

const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
const outageText = '일시적으로 이용할 수 없습니다';

async function fetchText(url) {
  const res = await fetch(url);
  const text = await res.text();
  return { res, text };
}

async function run() {
  if (process.env.SIMULATE_DB_FAIL !== '1') {
    console.error('FAIL: SIMULATE_DB_FAIL=1 must be set for this verification.');
    process.exit(1);
  }

  const boardUrl = `${baseUrl}/board`;
  const board = await fetchText(boardUrl);
  if (board.res.status !== 200) {
    console.error(`FAIL: /board returned ${board.res.status}`);
    process.exit(1);
  }

  if (!board.text.includes(outageText)) {
    console.error('FAIL: /board does not show outage message');
    process.exit(1);
  }

  if (board.text.includes('게시물이 없습니다')) {
    console.error('FAIL: /board shows "게시물이 없습니다" during DB failure');
    process.exit(1);
  }

  if (board.text.includes('전체 0') || board.text.includes('Total 0')) {
    console.error('FAIL: /board shows "Total 0" during DB failure');
    process.exit(1);
  }

  const fakeId = '00000000-0000-0000-0000-000000000000';
  const postUrl = `${baseUrl}/board/${fakeId}`;
  const post = await fetchText(postUrl);
  if (post.res.status !== 200) {
    console.error(`FAIL: /board/[id] returned ${post.res.status}`);
    process.exit(1);
  }

  if (!post.text.includes(outageText)) {
    console.error('FAIL: /board/[id] does not show outage message');
    process.exit(1);
  }

  if (post.text.includes('게시글을 찾을 수 없습니다')) {
    console.error('FAIL: /board/[id] shows "게시글을 찾을 수 없습니다" during DB failure');
    process.exit(1);
  }

  console.log('PASS: DB failure semantics are correct for /board and /board/[id]');
}

run().catch((error) => {
  console.error('FAIL:', error?.message || error);
  process.exit(1);
});

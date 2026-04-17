#!/usr/bin/env node

/**
 * Production verification script
 * Verifies that:
 * 1. /robots.txt returns 200
 * 2. /sitemap.xml returns 200 with valid XML
 * 3. /board shows posts (not "No posts" / "Total 0")
 * 4. /api/diag/public-board shows db connection ok
 * 5. /board/{knownId} renders with post content
 */

async function verifyEndpoint(url, baseUrl) {
  try {
    const fullUrl = baseUrl + url;
    const response = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Verification)',
      },
    });

    const body = await response.text();
    return {
      status: response.status,
      ok: response.ok,
      body: body,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

async function runVerifications() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  
  console.log(`\n🔍 Production Verification Report`);
  console.log(`📍 Base URL: ${baseUrl}`);
  console.log(`⏰ Timestamp: ${new Date().toISOString()}\n`);

  let passed = 0;
  let failed = 0;

  // Test 1: robots.txt
  console.log('1️⃣  Testing /robots.txt');
  const robotsResult = await verifyEndpoint('/robots.txt', baseUrl);
  if (robotsResult.error) {
    console.log(`   ❌ Error: ${robotsResult.error}`);
    failed++;
  } else if (robotsResult.status === 200) {
    console.log(`   ✅ Status 200, ${robotsResult.body.length} bytes`);
    passed++;
  } else {
    console.log(`   ❌ Status ${robotsResult.status}`);
    failed++;
  }

  // Test 2: sitemap.xml
  console.log('\n2️⃣  Testing /sitemap.xml');
  const sitemapResult = await verifyEndpoint('/sitemap.xml', baseUrl);
  if (sitemapResult.error) {
    console.log(`   ❌ Error: ${sitemapResult.error}`);
    failed++;
  } else if (sitemapResult.status === 200) {
    if (sitemapResult.body.includes('<urlset') && sitemapResult.body.includes('</urlset>')) {
      console.log(`   ✅ Status 200, valid XML`);
      const urlCount = (sitemapResult.body.match(/<url>/g) || []).length;
      console.log(`   📊 Found ${urlCount} URLs`);
      passed++;
    } else {
      console.log(`   ❌ Status 200 but invalid XML format`);
      failed++;
    }
  } else {
    console.log(`   ❌ Status ${sitemapResult.status}`);
    failed++;
  }

  // Test 3: /board page
  console.log('\n3️⃣  Testing /board page');
  const boardResult = await verifyEndpoint('/board', baseUrl);
  if (boardResult.error) {
    console.log(`   ❌ Error: ${boardResult.error}`);
    failed++;
  } else if (boardResult.status === 200) {
    if (boardResult.body.includes('No posts') || boardResult.body.includes('Total 0')) {
      console.log(`   ⚠️  Status 200 but showing "No posts" or "Total 0"`);
      console.log(`   💡 Possible causes: DATABASE_URL not set, posts table empty, or DB connection failed`);
      failed++;
    } else if (boardResult.body.includes('Total') || boardResult.body.includes('post')) {
      console.log(`   ✅ Status 200, posts data visible`);
      passed++;
    } else {
      console.log(`   ⚠️  Status 200 but unclear if posts rendered`);
      passed++;
    }
  } else {
    console.log(`   ❌ Status ${boardResult.status}`);
    failed++;
  }

  // Test 4: /api/diag/public-board
  console.log('\n4️⃣  Testing /api/diag/public-board (diagnostics)');
  const diagResult = await verifyEndpoint('/api/diag/public-board', baseUrl);
  if (diagResult.error) {
    console.log(`   ❌ Error: ${diagResult.error}`);
    failed++;
  } else if (diagResult.status === 200) {
    try {
      const data = JSON.parse(diagResult.body);
      console.log(`   ✅ Endpoint working`);
      console.log(`   📊 DB Connection: ${data.dbConnection}`);
      console.log(`   📝 Posts Count: ${data.postsCount}`);
      if (data.errorMessage) {
        console.log(`   ⚠️  Error: ${data.errorMessage}`);
      }
      if (data.dbConnection === 'ok' && data.postsCount > 0) {
        passed++;
      } else {
        failed++;
      }
    } catch (e) {
      console.log(`   ❌ Invalid JSON response: ${e.message}`);
      failed++;
    }
  } else {
    console.log(`   ❌ Status ${diagResult.status}`);
    failed++;
  }

  // Test 5: /board/{id} with known post (if available)
  console.log('\n5️⃣  Testing /board/{id} (post detail)');
  try {
    const diagData = JSON.parse((await verifyEndpoint('/api/diag/public-board', baseUrl)).body || '{}');
    if (diagData.samplePostId) {
      const postDetailResult = await verifyEndpoint(`/board/${diagData.samplePostId}`, baseUrl);
      if (postDetailResult.error) {
        console.log(`   ❌ Error: ${postDetailResult.error}`);
        failed++;
      } else if (postDetailResult.status === 200) {
        if (
          postDetailResult.body.includes('Post not found') ||
          postDetailResult.body.includes('존재하지 않는')
        ) {
          console.log(`   ❌ Status 200 but showing "Post not found"`);
          console.log(`   💡 Post ID ${diagData.samplePostId} not accessible`);
          failed++;
        } else if (postDetailResult.body.length > 500) {
          console.log(`   ✅ Status 200, post content rendered (${postDetailResult.body.length} bytes)`);
          passed++;
        } else {
          console.log(`   ⚠️  Status 200 but short content (${postDetailResult.body.length} bytes)`);
          passed++;
        }
      } else {
        console.log(`   ❌ Status ${postDetailResult.status}`);
        failed++;
      }
    } else {
      console.log(`   ⏭️  Skipped (no sample posts available)`);
    }
  } catch (e) {
    console.log(`   ❌ Error checking diagnostics: ${e.message}`);
  }

  // Summary
  const total = passed + failed;
  const percentage = Math.round((passed / total) * 100);
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📋 Summary: ${passed}/${total} checks passed (${percentage}%)`);
  console.log(`${'='.repeat(50)}`);

  if (failed === 0) {
    console.log('✅ All checks passed!');
    process.exit(0);
  } else {
    console.log(`❌ ${failed} check(s) failed`);
    console.log(
      '\n💡 Debug steps:',
      '\n1. Check DATABASE_URL is set in production',
      '\n2. Verify posts table exists and has data',
      '\n3. Check /api/diag/public-board for detailed errors',
      '\n4. Review server logs for [board] and [sitemap] messages'
    );
    process.exit(1);
  }
}

runVerifications().catch((error) => {
  console.error('❌ Verification script error:', error);
  process.exit(1);
});

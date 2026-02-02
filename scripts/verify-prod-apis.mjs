#!/usr/bin/env node

/**
 * Production API Verification Script
 * 
 * Verifies that production APIs are working correctly:
 * 1. /api/diag/public-board shows DB connection OK
 * 2. /api/posts returns posts (not db_unavailable)
 * 3. /api/categories returns categories (not db_unavailable)
 * 4. /board UI does not show SERVICE_TEMP_UNAVAILABLE
 */

const BASE_URL = process.env.PROD_URL || 'https://interprep.com';

console.log(`Verifying production APIs at: ${BASE_URL}\n`);

async function verifyDiagEndpoint() {
  console.log('Check 1: /api/diag/public-board');
  try {
    const response = await fetch(`${BASE_URL}/api/diag/public-board`);
    const data = await response.json();
    
    if (data.dbConnection !== 'ok') {
      console.error('FAIL: DB connection is not OK');
      console.error('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    if (data.runtime !== 'nodejs') {
      console.error('FAIL: Runtime is not nodejs:', data.runtime);
      return false;
    }
    
    if (!data.postsCount || data.postsCount === 0) {
      console.error('FAIL: postsCount is 0 or missing');
      console.error('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    console.log(`✓ PASS: DB connection OK, runtime: ${data.runtime}, postsCount: ${data.postsCount}`);
    return true;
  } catch (error) {
    console.error('FAIL: Exception during diag endpoint check:', error.message);
    return false;
  }
}

async function verifyPostsEndpoint() {
  console.log('\nCheck 2: /api/posts?sort=latest&page=1&pageSize=10');
  try {
    const response = await fetch(`${BASE_URL}/api/posts?sort=latest&page=1&pageSize=10`);
    
    if (response.status === 503) {
      console.error('FAIL: /api/posts returned 503 (db_unavailable)');
      const data = await response.json();
      console.error('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    if (!response.ok) {
      console.error(`FAIL: /api/posts returned status ${response.status}`);
      const text = await response.text();
      console.error('Response:', text.substring(0, 500));
      return false;
    }
    
    const data = await response.json();
    
    if (data.error === 'db_unavailable') {
      console.error('FAIL: /api/posts returned db_unavailable error');
      console.error('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    if (!data.items || !Array.isArray(data.items)) {
      console.error('FAIL: /api/posts response missing items array');
      console.error('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    if (data.items.length === 0) {
      console.error('FAIL: /api/posts returned 0 items (unexpected)');
      console.error('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    console.log(`✓ PASS: /api/posts returned ${data.items.length} items, totalCount: ${data.totalCount}`);
    return true;
  } catch (error) {
    console.error('FAIL: Exception during posts endpoint check:', error.message);
    return false;
  }
}

async function verifyCategoriesEndpoint() {
  console.log('\nCheck 3: /api/categories');
  try {
    const response = await fetch(`${BASE_URL}/api/categories`);
    
    if (response.status === 503) {
      console.error('FAIL: /api/categories returned 503 (db_unavailable)');
      const data = await response.json();
      console.error('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    if (!response.ok) {
      console.error(`FAIL: /api/categories returned status ${response.status}`);
      const text = await response.text();
      console.error('Response:', text.substring(0, 500));
      return false;
    }
    
    const data = await response.json();
    
    if (data.error === 'db_unavailable' || data.error === 'Failed to fetch categories') {
      console.error('FAIL: /api/categories returned error:', data.error);
      console.error('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    if (!data.categories || !Array.isArray(data.categories)) {
      console.error('FAIL: /api/categories response missing categories array');
      console.error('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    console.log(`✓ PASS: /api/categories returned ${data.categories.length} categories`);
    return true;
  } catch (error) {
    console.error('FAIL: Exception during categories endpoint check:', error.message);
    return false;
  }
}

async function verifyBoardUI() {
  console.log('\nCheck 4: /board UI');
  try {
    const response = await fetch(`${BASE_URL}/board`);
    
    if (!response.ok) {
      console.error(`FAIL: /board returned status ${response.status}`);
      return false;
    }
    
    const html = await response.text();
    
    if (html.includes('SERVICE_TEMP_UNAVAILABLE')) {
      console.error('FAIL: /board UI shows SERVICE_TEMP_UNAVAILABLE marker');
      console.error('This means the board is showing the outage message to users');
      return false;
    }
    
    if (html.includes('데이터베이스 연결에 일시적인 문제')) {
      console.error('FAIL: /board UI shows database outage message in Korean');
      return false;
    }
    
    console.log('✓ PASS: /board UI does not show outage message');
    return true;
  } catch (error) {
    console.error('FAIL: Exception during board UI check:', error.message);
    return false;
  }
}

// Run all checks
async function main() {
  const results = await Promise.all([
    verifyDiagEndpoint(),
    verifyPostsEndpoint(),
    verifyCategoriesEndpoint(),
    verifyBoardUI()
  ]);
  
  const allPassed = results.every(result => result === true);
  
  console.log('\n' + '='.repeat(60));
  if (allPassed) {
    console.log('✓ ALL CHECKS PASSED');
    console.log('Production APIs are working correctly');
    process.exit(0);
  } else {
    console.log('✗ SOME CHECKS FAILED');
    console.log('Production APIs have issues - review logs above');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

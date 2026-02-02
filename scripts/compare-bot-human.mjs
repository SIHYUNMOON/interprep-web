#!/usr/bin/env node

/**
 * Compare bot vs human User-Agent responses for /board
 * This helps diagnose if bots see different content than humans
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const userAgents = {
  human: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  gptbot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)',
};

async function fetchWithUA(url, userAgent, label) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': userAgent,
      },
    });

    const status = response.status;
    const html = await response.text();
    
    // Check for post links in HTML
    const postLinkMatches = html.match(/href="\/board\/[a-f0-9-]{36}"/gi) || [];
    const uniquePostLinks = [...new Set(postLinkMatches)];
    
    // Check for empty state messages
    const hasEmptyState = 
      html.includes('게시물이 없습니다') || 
      html.includes('no posts') ||
      html.includes('No posts found');

    return {
      label,
      status,
      postLinksCount: uniquePostLinks.length,
      hasEmptyState,
      contentLength: html.length,
    };
  } catch (error) {
    return {
      label,
      error: error.message,
    };
  }
}

async function fetchDiagAPI(userAgent, label) {
  try {
    const response = await fetch(`${BASE_URL}/api/diag/board-visibility`, {
      headers: {
        'User-Agent': userAgent,
      },
    });

    if (!response.ok) {
      return {
        label,
        error: `API returned ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      label,
      ...data,
    };
  } catch (error) {
    return {
      label,
      error: error.message,
    };
  }
}

async function main() {
  console.log('🔍 Comparing bot vs human responses...\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  // Test /board page
  console.log('=== Testing /board page ===\n');
  
  const boardResults = await Promise.all([
    fetchWithUA(`${BASE_URL}/board`, userAgents.human, 'Human (Chrome)'),
    fetchWithUA(`${BASE_URL}/board`, userAgents.googlebot, 'Googlebot'),
    fetchWithUA(`${BASE_URL}/board`, userAgents.gptbot, 'GPTBot'),
  ]);

  boardResults.forEach(result => {
    console.log(`${result.label}:`);
    if (result.error) {
      console.log(`  ❌ Error: ${result.error}`);
    } else {
      console.log(`  Status: ${result.status}`);
      console.log(`  Post links found: ${result.postLinksCount}`);
      console.log(`  Has empty state: ${result.hasEmptyState}`);
      console.log(`  Content length: ${result.contentLength} bytes`);
    }
    console.log('');
  });

  // Test diagnostic API
  console.log('=== Testing /api/diag/board-visibility ===\n');
  
  const diagResults = await Promise.all([
    fetchDiagAPI(userAgents.human, 'Human (Chrome)'),
    fetchDiagAPI(userAgents.googlebot, 'Googlebot'),
    fetchDiagAPI(userAgents.gptbot, 'GPTBot'),
  ]);

  diagResults.forEach(result => {
    console.log(`${result.label}:`);
    if (result.error) {
      console.log(`  ❌ Error: ${result.error}`);
    } else {
      console.log(`  Detected as bot: ${result.isBot}`);
      console.log(`  Posts count: ${result.postsCount}`);
      console.log(`  Sample post ID: ${result.samplePostId || 'none'}`);
      console.log(`  Items returned: ${result.pageInfo?.itemsReturned || 0}`);
    }
    console.log('');
  });

  // Check for problems
  const humanResult = boardResults[0];
  const botResults = boardResults.slice(1);
  
  let hasIssues = false;

  console.log('=== Analysis ===\n');

  if (!humanResult.error && humanResult.postLinksCount === 0) {
    console.log('⚠️  WARNING: Human UA sees no post links (might be client-side only rendering)');
    hasIssues = true;
  }

  botResults.forEach(botResult => {
    if (botResult.error) {
      console.log(`❌ ${botResult.label} failed: ${botResult.error}`);
      hasIssues = true;
    } else if (!humanResult.error && botResult.postLinksCount < humanResult.postLinksCount) {
      console.log(`❌ ${botResult.label} sees fewer posts than human (${botResult.postLinksCount} vs ${humanResult.postLinksCount})`);
      hasIssues = true;
    } else if (botResult.hasEmptyState && humanResult.postLinksCount > 0) {
      console.log(`❌ ${botResult.label} shows empty state while posts exist`);
      hasIssues = true;
    }
  });

  const botDiagResults = diagResults.slice(1);
  botDiagResults.forEach(diagResult => {
    if (!diagResult.error && diagResult.postsCount === 0) {
      console.log(`❌ ${diagResult.label} API reports 0 posts`);
      hasIssues = true;
    }
  });

  if (!hasIssues) {
    console.log('✅ No issues detected - bots see the same content as humans');
  }

  process.exit(hasIssues ? 1 : 0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

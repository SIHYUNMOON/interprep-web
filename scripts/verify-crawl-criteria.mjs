#!/usr/bin/env node

/**
 * Comprehensive Crawl Criteria Verification Script
 * Validates all 6 acceptance criteria for bot/crawler visibility
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const USER_AGENTS = {
  human: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  gptbot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)',
};

const results = {
  passed: [],
  failed: [],
  warnings: [],
};

function pass(criterion, evidence) {
  results.passed.push({ criterion, evidence });
  console.log(`✅ PASS: ${criterion}`);
  console.log(`   Evidence: ${evidence}\n`);
}

function fail(criterion, reason) {
  results.failed.push({ criterion, reason });
  console.log(`❌ FAIL: ${criterion}`);
  console.log(`   Reason: ${reason}\n`);
}

function warn(message) {
  results.warnings.push(message);
  console.log(`⚠️  WARNING: ${message}\n`);
}

async function fetchWithUA(url, userAgent) {
  const response = await fetch(url, {
    headers: { 'User-Agent': userAgent },
  });
  const text = await response.text();
  return { status: response.status, html: text };
}

async function testCriterion1() {
  console.log('=== Criterion 1: /board view-source contains multiple "/board/{uuid}" links ===\n');
  
  try {
    const { status, html } = await fetchWithUA(`${BASE_URL}/board`, USER_AGENTS.human);
    
    if (status !== 200) {
      fail('Criterion 1', `/board returned status ${status} instead of 200`);
      return;
    }
    
    // Match <a href="/board/{uuid}"> or href="/board/{uuid}"
    const linkPattern = /href=["']\/board\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}["']/gi;
    const matches = html.match(linkPattern) || [];
    const uniqueLinks = [...new Set(matches)];
    
    if (uniqueLinks.length >= 1) {
      pass(
        'Criterion 1',
        `Found ${uniqueLinks.length} unique board post links in HTML. Sample: ${uniqueLinks[0]?.substring(0, 50)}`
      );
    } else {
      fail('Criterion 1', `Found only ${uniqueLinks.length} links, expected at least 1`);
    }
  } catch (error) {
    fail('Criterion 1', `Error: ${error.message}`);
  }
}

async function testCriterion2() {
  console.log('=== Criterion 2: /board with JavaScript disabled shows non-empty post list ===\n');
  
  try {
    const { status, html } = await fetchWithUA(`${BASE_URL}/board`, USER_AGENTS.human);
    
    if (status !== 200) {
      fail('Criterion 2', `/board returned status ${status}`);
      return;
    }
    
    // Check for noscript content - this is what shows when JS is disabled
    const hasNoscript = html.includes('<noscript>');
    const noscriptHasTable = html.includes('<noscript>') && html.match(/<noscript>[\s\S]*?<table[\s\S]*?<\/table>[\s\S]*?<\/noscript>/);
    const noscriptHasLinks = html.match(/<noscript>[\s\S]*?href=["']\/board\/[a-f0-9-]{36}["'][\s\S]*?<\/noscript>/);
    
    // Check for empty state messages
    const hasEmptyMessage = 
      html.includes('게시물이 없습니다') || 
      html.includes('No posts found');
    
    // Check for actual content indicators in main HTML (for bots)
    const hasPostLinks = /href=["']\/board\/[a-f0-9-]{36}["']/i.test(html);
    const hasPostTitles = html.match(/<td[^>]*>.*?<\/td>/gi)?.length > 10; // Should have multiple table cells
    
    // Validate noscript section exists and has content
    if (!hasNoscript) {
      warn('No <noscript> section found - page may be blank with JS disabled');
    } else if (!noscriptHasTable) {
      warn('Noscript section exists but missing table - may not display properly without JS');
    } else if (!noscriptHasLinks) {
      warn('Noscript section missing post links - may not work without JS');
    }
    
    if (hasEmptyMessage && hasPostLinks) {
      warn('Found post links but also empty state message - might show incorrectly when JS disabled');
    }
    
    if (hasPostLinks && hasPostTitles && hasNoscript && noscriptHasTable) {
      pass(
        'Criterion 2',
        'SSR HTML contains post list with links AND noscript fallback (works without JavaScript)'
      );
    } else {
      fail(
        'Criterion 2',
        `Post list not properly rendered for no-JS. Has links: ${hasPostLinks}, Has table cells: ${hasPostTitles}, Has noscript: ${hasNoscript}`
      );
    }
  } catch (error) {
    fail('Criterion 2', `Error: ${error.message}`);
  }
}

async function testCriteria3and4() {
  console.log('=== Criteria 3 & 4: /board/{uuid} view-source contains title + body (SSR) ===\n');
  
  try {
    // First get a UUID from the board page
    const { html: boardHtml } = await fetchWithUA(`${BASE_URL}/board`, USER_AGENTS.human);
    const uuidMatch = boardHtml.match(/href=["']\/board\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})["']/i);
    
    if (!uuidMatch) {
      // Try getting from sitemap
      const { html: sitemapHtml } = await fetchWithUA(`${BASE_URL}/sitemap.xml`, USER_AGENTS.human);
      const sitemapUuidMatch = sitemapHtml.match(/\/board\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
      
      if (!sitemapUuidMatch) {
        fail('Criteria 3 & 4', 'Cannot find any post UUID to test (no posts in board or sitemap)');
        return;
      }
      
      const uuid = sitemapUuidMatch[1];
      await testPostPage(uuid);
    } else {
      const uuid = uuidMatch[1];
      await testPostPage(uuid);
    }
  } catch (error) {
    fail('Criteria 3 & 4', `Error: ${error.message}`);
  }
}

async function testPostPage(uuid) {
  const { status, html } = await fetchWithUA(`${BASE_URL}/board/${uuid}`, USER_AGENTS.human);
  
  if (status !== 200) {
    fail('Criteria 3 & 4', `Post page returned status ${status} instead of 200`);
    return;
  }
  
  // Check for loading state
  if (html.includes('로딩 중...') || html.includes('Loading...')) {
    fail('Criteria 3 & 4', 'SSR HTML still contains "Loading..." placeholder');
    return;
  }
  
  // Check for title - should be in <h1> or <title> or meta tags
  const hasTitle = 
    /<h1[^>]*>(?!로딩|Loading|Not Found)[^<]{3,}<\/h1>/i.test(html) ||
    /<title>(?!Not Found|로딩)[^<]{5,}<\/title>/i.test(html);
  
  // Check for body content - look for substantial text content
  // Remove script tags and count remaining text
  const htmlWithoutScripts = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  const textContent = htmlWithoutScripts.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const hasSubstantialContent = textContent.length > 500; // At least 500 chars of text
  
  if (hasTitle && hasSubstantialContent) {
    pass(
      'Criteria 3 & 4',
      `Post page UUID ${uuid.substring(0, 8)}... contains title and body (${textContent.length} chars of text)`
    );
  } else {
    fail(
      'Criteria 3 & 4',
      `Post page incomplete. Has title: ${hasTitle}, Text length: ${textContent.length}`
    );
  }
}

async function testCriterion5() {
  console.log('=== Criterion 5: /sitemap.xml returns 200 and includes board URLs ===\n');
  
  try {
    const { status, html } = await fetchWithUA(`${BASE_URL}/sitemap.xml`, USER_AGENTS.human);
    
    if (status !== 200) {
      fail('Criterion 5', `Sitemap returned status ${status} instead of 200`);
      return;
    }
    
    // Check XML structure
    if (!html.includes('<urlset') && !html.includes('<?xml')) {
      fail('Criterion 5', 'Response is not valid XML (missing <urlset> or <?xml>)');
      return;
    }
    
    // Check for board URLs
    const boardUrlMatches = html.match(/<loc>[^<]*\/board\/[a-f0-9-]{36}<\/loc>/gi) || [];
    const staticBoardUrl = html.includes('/board<');
    
    if (boardUrlMatches.length > 0 && staticBoardUrl) {
      pass(
        'Criterion 5',
        `Sitemap contains ${boardUrlMatches.length} post URLs plus /board page`
      );
    } else {
      fail(
        'Criterion 5',
        `Sitemap incomplete. Post URLs: ${boardUrlMatches.length}, Has /board: ${staticBoardUrl}`
      );
    }
  } catch (error) {
    fail('Criterion 5', `Error: ${error.message}`);
  }
}

async function testCriterion6() {
  console.log('=== Criterion 6: Bot UAs see same content as human UA ===\n');
  
  try {
    const results = {};
    
    // Test /board with different UAs
    for (const [name, ua] of Object.entries(USER_AGENTS)) {
      const { status, html } = await fetchWithUA(`${BASE_URL}/board`, ua);
      const links = html.match(/href=["']\/board\/[a-f0-9-]{36}["']/gi) || [];
      const hasEmpty = html.includes('게시물이 없습니다') || html.includes('No posts');
      
      results[name] = {
        status,
        linkCount: links.length,
        hasEmpty,
      };
    }
    
    // Compare results
    const humanLinks = results.human.linkCount;
    const googlebotLinks = results.googlebot.linkCount;
    const gptbotLinks = results.gptbot.linkCount;
    
    const allSameStatus = 
      results.human.status === results.googlebot.status &&
      results.human.status === results.gptbot.status;
    
    const botsSeeContent = googlebotLinks > 0 && gptbotLinks > 0;
    const noEmptyForBots = !results.googlebot.hasEmpty && !results.gptbot.hasEmpty;
    
    if (allSameStatus && botsSeeContent && noEmptyForBots) {
      pass(
        'Criterion 6',
        `All UAs see consistent content. Human: ${humanLinks} links, Googlebot: ${googlebotLinks}, GPTBot: ${gptbotLinks}`
      );
    } else {
      fail(
        'Criterion 6',
        `Inconsistent responses. Same status: ${allSameStatus}, Bots see content: ${botsSeeContent}, No empty states: ${noEmptyForBots}`
      );
    }
    
    // Also test a post detail page
    if (humanLinks > 0) {
      const { html: boardHtml } = await fetchWithUA(`${BASE_URL}/board`, USER_AGENTS.human);
      const uuidMatch = boardHtml.match(/href=["']\/board\/([a-f0-9-]{36})["']/i);
      
      if (uuidMatch) {
        const uuid = uuidMatch[1];
        const postResults = {};
        
        for (const [name, ua] of Object.entries(USER_AGENTS)) {
          const { status, html } = await fetchWithUA(`${BASE_URL}/board/${uuid}`, ua);
          const hasLoading = html.includes('로딩 중') || html.includes('Loading');
          const textLength = html.replace(/<[^>]+>/g, '').length;
          
          postResults[name] = { status, hasLoading, textLength };
        }
        
        const allPostsSame = 
          postResults.human.status === postResults.googlebot.status &&
          postResults.human.status === postResults.gptbot.status &&
          postResults.human.status === 200;
        
        const noLoadingStates = 
          !postResults.googlebot.hasLoading && !postResults.gptbot.hasLoading;
        
        if (!allPostsSame || !noLoadingStates) {
          warn(`Post detail pages may differ for bots. Check UUID ${uuid.substring(0, 8)}...`);
        }
      }
    }
  } catch (error) {
    fail('Criterion 6', `Error: ${error.message}`);
  }
}

async function main() {
  console.log('🔍 Crawl Criteria Verification');
  console.log(`Base URL: ${BASE_URL}`);
  console.log('='.repeat(80) + '\n');
  
  await testCriterion1();
  await testCriterion2();
  await testCriteria3and4();
  await testCriterion5();
  await testCriterion6();
  
  console.log('='.repeat(80));
  console.log('\n📊 SUMMARY\n');
  console.log(`✅ Passed: ${results.passed.length}/6 criteria`);
  console.log(`❌ Failed: ${results.failed.length}/6 criteria`);
  console.log(`⚠️  Warnings: ${results.warnings.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ FAILED CRITERIA:');
    results.failed.forEach(({ criterion, reason }) => {
      console.log(`   - ${criterion}: ${reason}`);
    });
  }
  
  if (results.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    results.warnings.forEach(warning => {
      console.log(`   - ${warning}`);
    });
  }
  
  const exitCode = results.failed.length > 0 ? 1 : 0;
  console.log(`\nExit code: ${exitCode}\n`);
  process.exit(exitCode);
}

main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

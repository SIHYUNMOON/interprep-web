import { test, expect } from '@playwright/test';

test.describe('Board Page - No JavaScript', () => {
  test('should render post list without JavaScript', async ({ browser }) => {
    // Create a new context with JavaScript disabled
    const context = await browser.newContext({
      javaScriptEnabled: false,
    });
    
    const page = await context.newPage();

    // Navigate to the board page
    await page.goto('/board');

    // Check that the page title is visible
    await expect(page.getByRole('heading', { name: /유학 관련 정보 게시판/i })).toBeVisible();

    // Check that the table is present
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Check that table headers are present
    await expect(page.getByRole('columnheader', { name: '제목' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: '작성자' })).toBeVisible();

    // Check for at least one post link (UUID format)
    const postLinks = page.locator('a[href^="/board/"]').filter({ 
      has: page.locator('span.truncate') 
    });
    
    const linkCount = await postLinks.count();
    
    // Should have at least 1 post link
    expect(linkCount).toBeGreaterThanOrEqual(1);

    // Verify first link is properly formed
    if (linkCount > 0) {
      const firstLink = postLinks.first();
      await expect(firstLink).toBeVisible();
      
      const href = await firstLink.getAttribute('href');
      expect(href).toMatch(/^\/board\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/);
    }

    // Verify the page is not blank
    const bodyText = await page.locator('body').textContent();
    expect(bodyText?.length).toBeGreaterThan(100);

    // Should not show "게시물이 없습니다" if there are posts
    if (linkCount > 0) {
      await expect(page.getByText('게시물이 없습니다')).not.toBeVisible();
    }

    await context.close();
  });

  test('should allow navigation to post detail without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
    });
    
    const page = await context.newPage();

    // Navigate to the board page
    await page.goto('/board');

    // Find the first post link
    const postLinks = page.locator('a[href^="/board/"]').filter({ 
      has: page.locator('span.truncate') 
    });
    
    const linkCount = await postLinks.count();

    if (linkCount > 0) {
      // Click the first post link
      await postLinks.first().click();

      // Wait for navigation
      await page.waitForLoadState('domcontentloaded');

      // Verify we're on a post detail page
      expect(page.url()).toMatch(/\/board\/[a-f0-9-]{36}$/);

      // Verify post content is visible (title should be in h1)
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();

      // Verify there's substantial content
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(200);
    }

    await context.close();
  });
});

test.describe('Board Page - With JavaScript', () => {
  test('should render interactive features with JavaScript enabled', async ({ page }) => {
    // Navigate to the board page (JavaScript enabled by default)
    await page.goto('/board');

    // Check that the page loads
    await expect(page.getByRole('heading', { name: /유학 관련 정보 게시판/i })).toBeVisible();

    // Check that interactive table is present
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Verify post links are present and clickable
    const postLinks = page.locator('a[href^="/board/"]').filter({ 
      has: page.locator('span.truncate') 
    });
    
    const linkCount = await postLinks.count();
    expect(linkCount).toBeGreaterThanOrEqual(1);

    // Verify sorting dropdown is present (interactive feature)
    const sortSelect = page.locator('select');
    await expect(sortSelect).toBeVisible();

    // Verify category filter buttons are present (interactive feature)
    const categoryButtons = page.locator('button').filter({ hasText: '전체' });
    await expect(categoryButtons.first()).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Textbook Flow', () => {
  test('user can view textbook list', async ({ page }) => {
    await page.goto('/textbooks');
    await expect(page.locator('h1, h2')).toContainText(/textbook/i);
  });

  test('user can view textbook detail', async ({ page }) => {
    await page.goto('/textbooks');
    const firstCard = page.locator('a[href*="/textbook/"]').first();
    if (await firstCard.count() > 0) {
      await firstCard.click();
      await expect(page.url()).toContain('/textbook/');
    }
  });
  
  test('user can search for textbooks', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.locator('input[placeholder*="Search"], input[type="text"]').first();
    if (await searchInput.count() > 0) {
      await searchInput.fill('Mathematics');
      const submitButton = page.locator('button[type="submit"]').first();
      if (await submitButton.count() > 0) {
        await submitButton.click();
        await expect(page.url()).toContain('query=Mathematics');
      }
    }
  });
});


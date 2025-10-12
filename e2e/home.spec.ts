import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the home page', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Check if the page contains the expected content
    await expect(page.getByText('MyHomePage')).toBeVisible();
  });
});

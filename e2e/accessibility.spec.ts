import { test, expect } from '@playwright/test';

test.describe('Accessibility and UI Tests', () => {
  test('keyboard navigation works for assessment', async ({ page }) => {
    await page.goto('/check-in');
    
    // Check if focused on radio
    const locator = page.locator('button[role="radio"]').first();
    await locator.focus();
    await expect(locator).toBeFocused();
    
    // Select via keyboard
    await page.keyboard.press('Enter');
    
    const nextBtn = page.getByRole('button', { name: 'Next question' });
    await nextBtn.focus();
    await expect(nextBtn).toBeFocused();
    await page.keyboard.press('Enter');
    
    // Verify question 2
    await expect(page.getByText('Question 2 of 9')).toBeVisible();
  });
});

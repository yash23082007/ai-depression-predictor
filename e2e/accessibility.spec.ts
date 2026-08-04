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

  test('can clear check-in form', async ({ page }) => {
    await page.goto('/check-in');
    
    // Answer first question
    const locator = page.locator('button[role="radio"]').first();
    await locator.click();
    
    // Go to next
    await page.getByRole('button', { name: 'Next question' }).click();
    await expect(page.getByText('Question 2 of 9')).toBeVisible();

    // Click clear
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Clear' }).click();

    // Verify back to question 1 and unchecked
    await expect(page.getByText('Question 1 of 9')).toBeVisible();
    await expect(page.locator('button[role="radio"]').first()).toHaveAttribute('aria-checked', 'false');
  });
});

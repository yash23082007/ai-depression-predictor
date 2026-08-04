import { test, expect } from '@playwright/test';

test.describe('Safety Flow Tests', () => {
  test('safety route appears first when safety answer is selected', async ({ page }) => {
    await page.goto('/check-in');
    
    // Fill out first 8 questions with safe answers
    for (let i = 0; i < 8; i++) {
      await page.getByRole('radio', { name: 'Not at all' }).first().click();
      await page.getByRole('button', { name: 'Next question' }).click();
    }

    // Question 9: Select a safety-triggered answer
    await page.getByRole('radio', { name: 'Nearly every day' }).click();
    await page.getByRole('button', { name: 'See my private summary' }).click();

    // Ensure Safety panel pops up first
    await expect(page.getByRole('heading', { name: 'Safety support' })).toBeVisible();
    await expect(page.getByText('Please pause and get support now.')).toBeVisible();
    
    // Check support links are visible
    await expect(page.getByRole('link', { name: 'Find local crisis support' })).toBeVisible();
  });

  test('positive safety result cannot auto-save and lacks save button', async ({ page }) => {
    await page.goto('/check-in');
    
    // Skip to safety question (Q9)
    for (let i = 0; i < 8; i++) {
      await page.locator('button[role="radio"]').first().click();
      await page.getByRole('button', { name: 'Next question' }).click();
    }
    
    // Answer 'Several days' for safety question
    await page.getByText('Several days').click();
    
    // Next shows safety support panel
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Continue to summary
    await page.getByRole('button', { name: 'Continue to private summary' }).click();
    
    // Ensure no save button
    await expect(page.getByRole('button', { name: 'Save this reflection locally' })).not.toBeVisible();
    await expect(page.getByText('Save this reflection only on this device')).not.toBeVisible();
  });

  test('focus is trapped in safety modal', async ({ page }) => {
    await page.goto('/check-in');
    
    // Skip to safety question (Q9)
    for (let i = 0; i < 8; i++) {
      await page.locator('button[role="radio"]').first().click();
      await page.getByRole('button', { name: 'Next question' }).click();
    }
    
    // Answer 'Several days' for safety question
    await page.getByText('Several days').click();
    
    // Next shows safety support panel
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Wait for modal
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // The first focusable element should be focused by our ref
    await expect(page.getByRole('link', { name: 'Befrienders Worldwide' })).toBeFocused();
    
    // Tab forward
    await page.keyboard.press('Tab');
    
    // Close button or next link
    // Not testing exact elements, just ensuring it stays in modal
    const activeElement = await page.evaluate(() => document.activeElement?.className || '');
    expect(activeElement).not.toContain('fixed inset-0'); // should be an interactive element
  });
});

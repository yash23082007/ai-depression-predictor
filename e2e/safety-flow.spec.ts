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
    
    // Fill out questions to trigger safety
    for (let i = 0; i < 8; i++) {
      await page.getByRole('radio', { name: 'Not at all' }).first().click();
      await page.getByRole('button', { name: 'Next question' }).click();
    }
    await page.getByRole('radio', { name: 'Nearly every day' }).click();
    await page.getByRole('button', { name: 'See my private summary' }).click();

    // Bypass safety popup to go to summary
    await page.getByRole('button', { name: 'Continue to private summary' }).click();
    
    // Verify summary is reached but Save button is NOT there
    await expect(page.getByRole('heading', { name: 'Your wellbeing summary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save this reflection locally' })).toHaveCount(0);
  });
});

import { test, expect } from '@playwright/test';

test.describe('Privacy Model Tests', () => {
  test('does not transmit answers over network', async ({ page }) => {
    const requests = [];
    page.on('request', request => {
      // Ignore static assets and dev server
      if (!request.url().includes('localhost:5173/') && !request.url().endsWith('.jsx') && !request.url().endsWith('.js') && !request.url().endsWith('.css')) {
        requests.push(request);
      }
    });

    await page.goto('/check-in');
    
    // Fill out all questions (not safety triggered to reach summary)
    for (let i = 0; i < 9; i++) {
      const option = await page.getByRole('radio', { name: 'Not at all' }).first();
      await option.click();
      if (i < 8) {
        await page.getByRole('button', { name: 'Next question' }).click();
      } else {
        await page.getByRole('button', { name: 'See my private summary' }).click();
      }
    }

    await expect(page.getByRole('heading', { name: 'Your wellbeing summary' })).toBeVisible();

    // Verify no external requests were made with answer data
    const apiRequests = requests.filter(req => req.method() === 'POST' || req.method() === 'PUT');
    expect(apiRequests.length).toBe(0);

    // Verify no answer values in URL
    expect(page.url()).not.toContain('answers');
    expect(page.url()).not.toContain('score');
  });

  test('IndexedDB saves only after explicit opt-in', async ({ page }) => {
    await page.goto('/my-data');
    await expect(page.getByText('0 saved reflections')).toBeVisible();

    // Do check-in
    await page.goto('/check-in');
    for (let i = 0; i < 9; i++) {
      await page.getByRole('radio', { name: 'Not at all' }).first().click();
      if (i < 8) await page.getByRole('button', { name: 'Next question' }).click();
      else await page.getByRole('button', { name: 'See my private summary' }).click();
    }

    await expect(page.getByRole('heading', { name: 'Your wellbeing summary' })).toBeVisible();
    
    // Verify NOT saved yet
    await page.goto('/my-data');
    await expect(page.getByText('0 saved reflections')).toBeVisible();

    // Save now
    await page.goto('/check-in');
    for (let i = 0; i < 9; i++) {
      await page.getByRole('radio', { name: 'Not at all' }).first().click();
      if (i < 8) await page.getByRole('button', { name: 'Next question' }).click();
      else await page.getByRole('button', { name: 'See my private summary' }).click();
    }
    
    await page.getByRole('button', { name: 'Save this reflection locally' }).click();
    await expect(page.getByText('✓ Saved on this device')).toBeVisible();

    // Verify saved
    await page.goto('/my-data');
    await expect(page.getByText('1 saved reflection')).toBeVisible();

    // Delete clears it
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Delete all saved reflections' }).click();
    await expect(page.getByText('0 saved reflections')).toBeVisible();
  });
});

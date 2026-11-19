import { expect, test } from '@playwright/test';

test('starter page matches its visual baseline', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Visual baselines are recorded in Chromium only.');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('http://localhost:5173');
  await expect(page.locator('main')).toHaveScreenshot('starter-page.png', {
    animations: 'disabled',
  });
});

test('button and input stories match their visual baselines', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Visual baselines are recorded in Chromium only.');

  await page.goto('http://localhost:6006/?path=/story/components-button--primary');
  const storyFrame = page.frameLocator('#storybook-preview-iframe');
  await page.mouse.move(0, 0);
  await expect(storyFrame.getByRole('button', { name: 'Нажми меня' })).toHaveScreenshot(
    'button-primary.png',
    {
      animations: 'disabled',
      timeout: 15000,
    },
  );

  await page.goto('http://localhost:6006/?path=/story/components-input--with-error');
  const inputFrame = page.frameLocator('#storybook-preview-iframe');
  await page.mouse.move(0, 0);
  await expect(inputFrame.getByLabel('Электронная почта')).toHaveScreenshot('input-error.png', {
    animations: 'disabled',
    timeout: 15000,
  });
});

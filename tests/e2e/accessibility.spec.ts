import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function expectPageToBeAccessible(page: Page, path: string, heading: string | RegExp) {
  await page.goto(`http://localhost:5173${path}`);
  await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  await page.addStyleTag({
    content:
      '*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }',
  });

  for (const theme of ['dark', 'light'] as const) {
    const currentTheme = await page.locator('html').getAttribute('data-theme');

    if (currentTheme !== theme) {
      const themeButtonName =
        currentTheme === 'dark' ? 'Switch to light theme' : 'Переключить на тёмную тему';
      await page.getByRole('button', { name: themeButtonName }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    }

    const { violations } = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    const summary = violations.map(({ id, help }) => `${id}: ${help}`).join('\n');

    expect(violations, `Accessibility violations on ${path} (${theme} theme):\n${summary}`).toEqual(
      [],
    );
  }
}

test('Homepage has no WCAG 2.1 A/AA violations', async ({ page }) => {
  await expectPageToBeAccessible(page, '/', /создай новый проект на готовой основе/i);
});

test('Component gallery and library examples have no WCAG 2.1 A/AA violations', async ({
  page,
}) => {
  await expectPageToBeAccessible(page, '/components', 'UI-компоненты');
  await expectPageToBeAccessible(page, '/examples', 'Примеры интеграций');
});

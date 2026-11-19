import { test, expect } from '@playwright/test';

test('Homepage loads', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const favicon = await page.request.get('http://localhost:5173/brand/favicon.svg');
  expect(favicon.ok()).toBeTruthy();
  await expect(page).toHaveTitle('Шаблон React + TypeScript + Vite + Tailwind CSS — @vakkrizey');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.getByRole('link', { name: 'Открыть на GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/vakkrizey/react-vite-ts-tw-template',
  );
});

test('Language choice persists and layout fits a mobile screen', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173');
  await expect(
    page.getByRole('heading', { name: /создай новый проект на готовой основе/i }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Switch language to English' }).click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle('React + TypeScript + Vite + Tailwind CSS Starter — @vakkrizey');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'A React, TypeScript, Vite, and Tailwind CSS starter template by @vakkrizey.',
  );
  await expect(
    page.getByRole('heading', { name: /build your next project on a solid foundation/i }),
  ).toBeVisible();

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('link', { name: 'View on GitHub' })).toBeVisible();
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', 375);
});

test('Theme choice persists and component route is available', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.getByRole('link', { name: 'Компоненты' }).click();
  await expect(page).toHaveURL('http://localhost:5173/components');
  await expect(page.getByRole('heading', { name: 'UI-компоненты' })).toBeVisible();
  await page.getByRole('button', { name: 'Switch language to English' }).click();
  await expect(page.getByRole('heading', { name: 'UI Components' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('link', { name: '← Home' })).toBeVisible();
});

test('Unknown routes show a 404 page with a home link', async ({ page }) => {
  await page.goto('http://localhost:5173/this-page-does-not-exist');
  await expect(page.getByRole('heading', { name: 'Страница не найдена' })).toBeVisible();
  await page.getByRole('link', { name: 'Вернуться на главную' }).click();
  await expect(page).toHaveURL('http://localhost:5173/');
});

test('Library examples work on the examples page', async ({ page }) => {
  await page.goto('http://localhost:5173/examples');
  await expect(page.getByRole('heading', { name: 'Примеры интеграций' })).toBeVisible();

  await page.getByRole('button', { name: 'Увеличить' }).click();
  await expect(page.getByTestId('zustand-count')).toHaveText('1');

  await page.getByRole('button', { name: 'Отправить' }).click();
  await expect(page.getByRole('alert').first()).toBeVisible();

  await page.getByLabel('Имя').fill('Алексей');
  await page.getByLabel('Электронная почта').fill('alex@example.com');
  await page.getByRole('button', { name: 'Отправить' }).click();
  await expect(page.getByRole('status')).toContainText('Алексей');
  await expect(page.getByText('Элемент списка 1', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Switch language to English' }).click();
  await expect(page.getByRole('heading', { name: 'Integration examples' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Integration examples' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

import { existsSync } from 'node:fs';
import { mkdir, lstat, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const removals = [
  'src/pages/ComponentsPage.tsx',
  'src/pages/ExamplesPage.tsx',
  'src/store/example-counter-store.ts',
  'src/store/example-counter-store.test.ts',
  'tests/e2e/visual.spec.ts-snapshots/starter-page-chromium-win32.png',
];

const replacements = new Map([
  [
    'src/app/App.tsx',
    `import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function PageLoadingFallback() {
  return (
    <main className="grid min-h-screen place-items-center" aria-busy="true">
      <p role="status">Загрузка…</p>
    </main>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
`,
  ],
  [
    'src/pages/HomePage.tsx',
    `import { useEffect, useState } from 'react';
import { useTheme } from '../app/theme-context';
import LanguageThemeControls from '../app/LanguageThemeControls';

type Language = 'en' | 'ru';

function getSavedLanguage(): Language {
  return window.localStorage.getItem('starter-language') === 'en' ? 'en' : 'ru';
}

function HomePage() {
  const [language, setLanguage] = useState<Language>(getSavedLanguage);
  const { theme, toggleTheme } = useTheme();
  const isRussian = language === 'ru';
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isRussian ? 'Новое приложение' : 'New application';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = isRussian
        ? 'Веб-приложение на React, TypeScript, Vite и Tailwind CSS.'
        : 'A web application built with React, TypeScript, Vite, and Tailwind CSS.';
    }
    window.localStorage.setItem('starter-language', language);
  }, [isRussian, language]);

  return (
    <main
      className={
        isDark
          ? 'min-h-screen bg-[#090b12] text-white'
          : 'min-h-screen bg-slate-100 text-slate-950'
      }
    >
      <header className="flex justify-end p-6">
        <LanguageThemeControls
          isRussian={isRussian}
          isDark={isDark}
          onLanguageToggle={() => setLanguage(isRussian ? 'en' : 'ru')}
          onThemeToggle={toggleTheme}
        />
      </header>
      <div className="mx-auto min-h-[calc(100svh-5rem)] max-w-7xl px-6 py-8">
        {/* Add your application UI here. */}
      </div>
    </main>
  );
}

export default HomePage;
`,
  ],
  [
    'src/app/App.test.tsx',
    `import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './ThemeProvider';

function renderApp() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe('App', () => {
  it('renders a clean application canvas', async () => {
    window.localStorage.clear();
    renderApp();

    expect(await screen.findByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('switches language and remembers the selection', async () => {
    window.localStorage.clear();
    document.head.innerHTML = '<meta name="description" content="Application description">';
    renderApp();

    fireEvent.click(screen.getByRole('button', { name: /Переключить язык на русский/ }));

    expect(await screen.findByRole('button', { name: /Switch language to English/ })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toBe('New application');
    expect(window.localStorage.getItem('starter-language')).toBe('en');
  });
});
`,
  ],
  [
    'tests/e2e/homepage.spec.ts',
    `import { expect, test } from '@playwright/test';

test('the clean application canvas loads and fits a mobile screen', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173');

  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page).toHaveTitle('Новое приложение');
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', 375);
});

test('language and theme choices persist after reload', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.getByRole('button', { name: /Переключить язык на русский/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');

  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page).toHaveTitle('New application');
});

test('unknown routes show a 404 page with a link home', async ({ page }) => {
  await page.goto('http://localhost:5173/this-page-does-not-exist');
  await expect(page.getByRole('heading', { name: 'Страница не найдена' })).toBeVisible();
  await page.getByRole('link', { name: 'Вернуться на главную' }).click();
  await expect(page).toHaveURL('http://localhost:5173/');
});
`,
  ],
  [
    'tests/e2e/accessibility.spec.ts',
    `import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function expectPageToBeAccessible(page: Page, path: string, heading?: string) {
  await page.goto('http://localhost:5173' + path);
  if (heading) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  } else {
    await expect(page.getByRole('main')).toBeVisible();
  }
  await expect(page.locator('html')).toHaveAttribute('data-theme', /^(dark|light)$/);
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
    const summary = violations.map(({ id, help }) => id + ': ' + help).join('\\n');
    expect(violations, 'Accessibility violations on ' + path + ' (' + theme + ' theme):\\n' + summary).toEqual([]);
  }
}

test('application routes have no WCAG 2.1 A/AA violations', async ({ page }) => {
  await expectPageToBeAccessible(page, '/');
  await expectPageToBeAccessible(page, '/this-page-does-not-exist', 'Страница не найдена');
});
`,
  ],
  [
    'tests/e2e/visual.spec.ts',
    `import { expect, test } from '@playwright/test';

test('button and input stories match their visual baselines', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Visual baselines are recorded in Chromium only.');

  await page.goto('http://localhost:6006/?path=/story/components-button--primary');
  const storyFrame = page.frameLocator('#storybook-preview-iframe');
  await page.mouse.move(0, 0);
  await expect(storyFrame.getByRole('button', { name: 'Нажми меня' })).toHaveScreenshot(
    'button-primary.png',
    { animations: 'disabled', timeout: 15000 },
  );

  await page.goto('http://localhost:6006/?path=/story/components-input--with-error');
  const inputFrame = page.frameLocator('#storybook-preview-iframe');
  await page.mouse.move(0, 0);
  await expect(inputFrame.getByLabel('Электронная почта')).toHaveScreenshot('input-error.png', {
    animations: 'disabled',
    timeout: 15000,
  });
});
`,
  ],
  [
    'index.html',
    `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/brand/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#090b12" />
    <meta
      name="description"
      content="Веб-приложение на React, TypeScript, Vite и Tailwind CSS."
    />
    <title>Новое приложение</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/app/main.tsx"></script>
  </body>
</html>
`,
  ],
  [
    'README.en.md',
    `# React + TypeScript + Vite

A clean foundation for a frontend application. The starter showcase and library demos have been removed; routing, theme and language controls, UI primitives, Storybook, and quality checks remain ready to use.

## Stack

- React 19, TypeScript 6, Vite 8, Tailwind CSS 4
- React Router 7, TanStack Query 5, Zustand 5
- React Hook Form, Zod, Motion, and TanStack Virtual
- Vitest, Testing Library, Playwright, axe-core, and Storybook

## Getting started

    npm install
    npm run dev

Use Node.js 22 or newer. The .nvmrc file records the recommended version.

## Useful commands

| Command | Purpose |
| --- | --- |
| npm run dev | Start the Vite development server |
| npm run build | Type-check and build the application |
| npm run lint | Run ESLint |
| npm run format:check | Check formatting with Prettier |
| npm run test:run | Run unit and component tests |
| npm run test:storybook | Test Storybook stories and their accessibility |
| npm run e2e | Run Playwright browser tests |
| npm run storybook | Start Storybook |
| npm run all-tests | Run lint, formatting checks, and all tests without building |
| npm run build | Build the application when needed |
| npm run build-storybook | Build Storybook when needed |

## Project structure

- src/app — routes, providers, theme, and global styles
- src/components/ui — reusable UI components with tests and Storybook stories
- src/pages — application pages and the 404 page
- src/features, src/hooks, src/lib, and src/store — extension points for app code
- tests/e2e — browser, accessibility, and component visual tests
- public — static assets served directly by URL

Start building in src/pages/HomePage.tsx, then add routes and features as the application grows.

For the Russian guide, see README.md.
`,
  ],
  [
    'README.md',
    `# React + TypeScript + Vite

Чистая основа для frontend-приложения. Стартовая витрина и демонстрационные интеграции удалены; роутер, переключатели темы и языка, UI-компоненты, Storybook и проверки качества остаются готовыми к работе.

## Технологический стек

- React 19, TypeScript 6, Vite 8, Tailwind CSS 4
- React Router 7, TanStack Query 5, Zustand 5
- React Hook Form, Zod, Motion и TanStack Virtual
- Vitest, Testing Library, Playwright, axe-core и Storybook

## Быстрый старт

    npm install
    npm run dev

Нужен Node.js 22 или новее. Рекомендуемая версия записана в .nvmrc.

## Полезные команды

| Команда | Назначение |
| --- | --- |
| npm run dev | Запустить сервер разработки Vite |
| npm run build | Проверить типы и собрать приложение |
| npm run lint | Запустить ESLint |
| npm run format:check | Проверить форматирование Prettier |
| npm run test:run | Запустить unit- и компонентные тесты |
| npm run test:storybook | Проверить истории Storybook и их доступность |
| npm run e2e | Запустить браузерные тесты Playwright |
| npm run storybook | Запустить Storybook |
| npm run all-tests | Проверить линтер, форматирование и все тесты без сборки |
| npm run build | Собрать приложение при необходимости |
| npm run build-storybook | Собрать Storybook при необходимости |

## Структура проекта

- src/app — маршруты, провайдеры, тема и глобальные стили
- src/components/ui — переиспользуемые компоненты с тестами и историями Storybook
- src/pages — страницы приложения и страница 404
- src/features, src/hooks, src/lib и src/store — папки для развития приложения
- tests/e2e — браузерные, accessibility- и визуальные проверки
- public — статические файлы, доступные напрямую по URL

Начните разработку с src/pages/HomePage.tsx, затем добавляйте маршруты и функции по мере роста приложения.

Англоязычная инструкция: README.en.md.
`,
  ],
]);

function resolveProjectPath(relativePath) {
  const absolutePath = path.resolve(projectRoot, relativePath);
  if (!absolutePath.startsWith(projectRoot + path.sep)) {
    throw new Error('Refusing to access a path outside the project: ' + relativePath);
  }
  return absolutePath;
}

function printPlan() {
  console.log('This command removes only the listed starter demo files:');
  for (const relativePath of removals) console.log('  - ' + relativePath);
  console.log(
    'It rewrites routes, the blank homepage, app metadata, both READMEs, and demo-bound tests.',
  );
  console.log('It changes the package name to my-react-app in package.json and package-lock.json.');
  console.log(
    'It preserves the UI library, component tests and stories, Storybook, CI, dependencies, routing, theme, language controls, error handling, and 404 page.',
  );
}

async function main() {
  if (process.argv.includes('--dry-run')) {
    printPlan();
    console.log('Dry run only: no files were changed.');
    return;
  }

  printPlan();
  if (!process.stdin.isTTY) {
    console.error('No interactive terminal detected. Run this command in a terminal to confirm.');
    process.exitCode = 1;
    return;
  }

  const terminal = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await terminal.question('Type CLEAN to apply these changes: ');
  terminal.close();
  if (answer !== 'CLEAN') {
    console.log('Cancelled. No files were changed.');
    return;
  }

  for (const relativePath of removals) {
    const target = resolveProjectPath(relativePath);
    if (!existsSync(target)) continue;
    const details = await lstat(target);
    if (!details.isFile()) {
      throw new Error('Refusing to remove a non-file path: ' + relativePath);
    }
    await unlink(target);
    console.log('Removed ' + relativePath);
  }

  for (const [relativePath, contents] of replacements) {
    const target = resolveProjectPath(relativePath);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, contents, 'utf8');
    console.log('Updated ' + relativePath);
  }

  const packagePath = resolveProjectPath('package.json');
  const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));
  packageJson.name = 'my-react-app';
  await writeFile(packagePath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');

  const lockPath = resolveProjectPath('package-lock.json');
  const lockJson = JSON.parse(await readFile(lockPath, 'utf8'));
  lockJson.name = 'my-react-app';
  if (lockJson.packages?.['']) lockJson.packages[''].name = 'my-react-app';
  await writeFile(lockPath, JSON.stringify(lockJson, null, 2) + '\n', 'utf8');

  console.log('Updated package name to my-react-app in package.json and package-lock.json.');
  console.log('Clean starter is ready. Review the changes, then run npm run all-tests.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

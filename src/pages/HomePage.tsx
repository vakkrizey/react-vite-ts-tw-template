import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../app/theme-context';
import LanguageThemeControls from '../app/LanguageThemeControls';

const getSavedLanguage = (): 'en' | 'ru' => {
  const savedLanguage = window.localStorage.getItem('starter-language');
  return savedLanguage === 'en' ? 'en' : 'ru';
};

function HomePage() {
  const [language, setLanguage] = useState<'en' | 'ru'>(getSavedLanguage);
  const { theme, toggleTheme } = useTheme();
  const isRussian = language === 'ru';
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isRussian
      ? 'Шаблон React + TypeScript + Vite + Tailwind CSS — @vakkrizey'
      : 'React + TypeScript + Vite + Tailwind CSS Starter — @vakkrizey';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = isRussian
        ? 'Стартовый шаблон на React, TypeScript, Vite и Tailwind CSS от @vakkrizey.'
        : 'A React, TypeScript, Vite, and Tailwind CSS starter template by @vakkrizey.';
    }
    window.localStorage.setItem('starter-language', language);
  }, [isRussian, language]);

  return (
    <main
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-16 ${isDark ? 'bg-[#090b12] text-white' : 'bg-slate-100 text-slate-950'}`}
    >
      <div className="pointer-events-none absolute -top-40 -left-40 size-[34rem] rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 -bottom-48 size-[34rem] rounded-full bg-cyan-500/15 blur-[130px]" />

      <section
        className={`relative w-full max-w-5xl rounded-[2rem] border p-8 shadow-2xl backdrop-blur-xl sm:p-12 lg:p-16 ${isDark ? 'border-white/10 bg-white/[0.04] shadow-black/30' : 'border-slate-200 bg-white/80 shadow-slate-300/50'}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            className={`flex items-center gap-3 text-sm font-medium tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_14px_2px_rgba(52,211,153,0.5)]" />
            {isRussian
              ? 'СТАРТОВЫЙ ШАБЛОН · ВСЁ ГОТОВО К РАБОТЕ'
              : 'STARTER TEMPLATE · READY TO GO'}
          </div>
          <nav className="flex items-center gap-2">
            <Link
              className={`rounded-full px-3 py-2 text-sm ${isDark ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200'}`}
              to="/components"
            >
              {isRussian ? 'Компоненты' : 'Components'}
            </Link>
            <Link
              className={`rounded-full px-3 py-2 text-sm ${isDark ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200'}`}
              to="/examples"
            >
              {isRussian ? 'Примеры' : 'Examples'}
            </Link>
            <LanguageThemeControls
              isRussian={isRussian}
              isDark={isDark}
              onLanguageToggle={() => setLanguage(isRussian ? 'en' : 'ru')}
              onThemeToggle={toggleTheme}
            />
          </nav>
        </div>

        <div className="mt-14 max-w-3xl sm:mt-20">
          <p className="mb-5 text-sm font-semibold tracking-[0.24em] text-violet-600 uppercase dark:text-violet-300">
            {isRussian ? 'Всё необходимое для старта' : 'Everything you need to get started'}
          </p>
          <h1 className="text-5xl leading-[1.04] font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            {isRussian ? 'Создай новый проект ' : 'Build your next project '}
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              {isRussian ? 'на готовой основе.' : 'on a solid foundation.'}
            </span>
          </h1>
          <p
            className={`mt-7 max-w-2xl text-lg leading-8 sm:text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {isRussian
              ? 'Здесь уже настроено всё нужное для разработки. Остаётся добавить свои компоненты и воплотить идею в жизнь.'
              : 'The essentials are already set up. Add your components, bring your idea to life, and make this project your own.'}
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-2.5 sm:mt-14">
          {[
            'React 19',
            'TypeScript',
            'Vite',
            'Tailwind CSS',
            'Zustand',
            'React Hook Form + Zod',
            'Motion',
            'TanStack Virtual',
            'Vitest',
            'Playwright',
            'Storybook',
          ].map((item) => (
            <span
              key={item}
              className={`rounded-full border px-4 py-2 text-sm ${isDark ? 'border-white/10 bg-white/[0.04] text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-7 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {isRussian ? 'Сделал ' : 'Made by '}
            <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
              @vakkrizey
            </span>
          </p>
          <a
            className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-200"
            href="https://github.com/vakkrizey/react-vite-ts-tw-template"
            target="_blank"
            rel="noreferrer"
          >
            {isRussian ? 'Открыть на GitHub' : 'View on GitHub'}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}

export default HomePage;

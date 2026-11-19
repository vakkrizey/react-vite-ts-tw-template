import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../app/theme-context';
import LanguageThemeControls from '../app/LanguageThemeControls';

function NotFoundPage() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState<'en' | 'ru'>(() =>
    window.localStorage.getItem('starter-language') === 'en' ? 'en' : 'ru',
  );
  const isRussian = language === 'ru';
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isRussian ? 'Страница не найдена — 404' : 'Page not found — 404';
    window.localStorage.setItem('starter-language', language);
  }, [isRussian, language]);

  return (
    <main
      className={`grid min-h-screen place-items-center px-6 py-12 text-center ${isDark ? 'bg-[#090b12] text-white' : 'bg-slate-100 text-slate-950'}`}
    >
      <div className="fixed top-6 right-6">
        <LanguageThemeControls
          isRussian={isRussian}
          isDark={isDark}
          onLanguageToggle={() => setLanguage(isRussian ? 'en' : 'ru')}
          onThemeToggle={toggleTheme}
        />
      </div>
      <section className="max-w-xl">
        <p
          className={`text-sm font-semibold tracking-[0.25em] uppercase ${isDark ? 'text-violet-300' : 'text-violet-700'}`}
        >
          404
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          {isRussian ? 'Страница не найдена' : 'Page not found'}
        </h1>
        <p className={`mt-4 text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {isRussian ? 'Похоже, такой страницы здесь нет.' : "Looks like this page doesn't exist."}
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
          to="/"
        >
          {isRussian ? 'Вернуться на главную' : 'Back to home'}
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;

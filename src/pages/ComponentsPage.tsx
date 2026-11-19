import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, Checkbox, Input, Select } from '../components';
import { useTheme } from '../app/theme-context';
import LanguageThemeControls from '../app/LanguageThemeControls';

function ComponentsPage() {
  const [language, setLanguage] = useState<'en' | 'ru'>(() =>
    window.localStorage.getItem('starter-language') === 'en' ? 'en' : 'ru',
  );
  const { theme, toggleTheme } = useTheme();
  const isRussian = language === 'ru';
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isRussian ? 'UI-компоненты — @vakkrizey' : 'UI Components — @vakkrizey';
    window.localStorage.setItem('starter-language', language);
  }, [isRussian, language]);

  return (
    <main
      className={`min-h-screen px-6 py-12 ${isDark ? 'bg-[#090b12] text-white' : 'bg-slate-100 text-slate-950'}`}
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <Link className="text-sm text-violet-500 hover:underline" to="/">
              {isRussian ? '← На главную' : '← Home'}
            </Link>
            <h1 className="mt-3 text-4xl font-bold">
              {isRussian ? 'UI-компоненты' : 'UI Components'}
            </h1>
          </div>
          <LanguageThemeControls
            isRussian={isRussian}
            isDark={isDark}
            onLanguageToggle={() => setLanguage(isRussian ? 'en' : 'ru')}
            onThemeToggle={toggleTheme}
          />
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="mb-4 text-lg font-semibold">
              {isRussian ? 'Кнопки и статусы' : 'Buttons and status'}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <Button>{isRussian ? 'Основное действие' : 'Primary action'}</Button>
              <Button variant="secondary">{isRussian ? 'Вторичное' : 'Secondary'}</Button>
              <Badge variant="success">{isRussian ? 'Готово' : 'Ready'}</Badge>
              <Badge variant="warning">{isRussian ? 'В ожидании' : 'Pending'}</Badge>
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-semibold">
              {isRussian ? 'Поля формы' : 'Form fields'}
            </h2>
            <div className="grid gap-5">
              <Input
                label={isRussian ? 'Электронная почта' : 'Email address'}
                placeholder="name@example.com"
                type="email"
              />
              <Select
                label={isRussian ? 'Роль' : 'Role'}
                placeholder={isRussian ? 'Выберите роль' : 'Select a role'}
                options={[
                  { label: isRussian ? 'Разработчик' : 'Developer', value: 'developer' },
                  { label: isRussian ? 'Дизайнер' : 'Designer', value: 'designer' },
                ]}
              />
              <Checkbox label={isRussian ? 'Следить за обновлениями' : 'Subscribe to updates'} />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default ComponentsPage;

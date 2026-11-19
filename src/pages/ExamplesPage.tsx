import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion } from 'motion/react';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components';
import { useTheme } from '../app/theme-context';
import LanguageThemeControls from '../app/LanguageThemeControls';
import { useExampleCounterStore } from '../store/example-counter-store';

const contactSchema = z.object({
  name: z.string().min(2, 'Введите минимум 2 символа.'),
  email: z.string().email('Введите корректный email.'),
});

type ContactFormValues = z.infer<typeof contactSchema>;
const virtualItems = Array.from({ length: 10_000 }, (_, index) => `Элемент списка ${index + 1}`);

const getSavedLanguage = (): 'en' | 'ru' =>
  window.localStorage.getItem('starter-language') === 'en' ? 'en' : 'ru';

function ExamplesPage() {
  const count = useExampleCounterStore((state) => state.count);
  const increment = useExampleCounterStore((state) => state.increment);
  const reset = useExampleCounterStore((state) => state.reset);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [language, setLanguage] = useState<'en' | 'ru'>(getSavedLanguage);
  const isRussian = language === 'ru';
  const [submittedName, setSubmittedName] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '' },
  });
  // This mutable instance is TanStack Virtual's intended API and is read during render.
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: virtualItems.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 40,
    overscan: 6,
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isRussian
      ? 'Примеры интеграций — React + TypeScript + Vite'
      : 'Integration examples — React + TypeScript + Vite';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = isRussian
        ? 'Примеры Zustand, React Hook Form, Zod, Motion и TanStack Virtual.'
        : 'Examples of Zustand, React Hook Form, Zod, Motion, and TanStack Virtual.';
    }
    window.localStorage.setItem('starter-language', language);
  }, [isRussian, language]);

  const text = isRussian
    ? {
        back: '← На главную',
        title: 'Примеры интеграций',
        intro: 'Рабочие примеры подключённых библиотек.',
        store: 'Состояние на Zustand',
        form: 'Форма с проверкой',
        animation: 'Анимация на Motion',
        virtual: 'Виртуальный список',
        increment: 'Увеличить',
        reset: 'Сбросить',
        name: 'Имя',
        email: 'Электронная почта',
        submit: 'Отправить',
        saved: 'Форма отправлена',
        items: '10 000 строк, в DOM только видимые элементы',
      }
    : {
        back: '← Home',
        title: 'Integration examples',
        intro: 'Working examples of the connected libraries.',
        store: 'State with Zustand',
        form: 'Validated form',
        animation: 'Motion animation',
        virtual: 'Virtualized list',
        increment: 'Increment',
        reset: 'Reset',
        name: 'Name',
        email: 'Email address',
        submit: 'Submit',
        saved: 'Form submitted',
        items: '10,000 rows, only visible items are rendered',
      };

  const onSubmit = (values: ContactFormValues) => setSubmittedName(values.name);

  return (
    <main
      className={`min-h-screen px-6 py-12 ${isDark ? 'bg-[#090b12] text-white' : 'bg-slate-100 text-slate-950'}`}
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            className={`text-sm hover:underline ${isDark ? 'text-violet-300' : 'text-violet-700'}`}
            to="/"
          >
            {text.back}
          </Link>
          <LanguageThemeControls
            isRussian={isRussian}
            isDark={isDark}
            onLanguageToggle={() => setLanguage(isRussian ? 'en' : 'ru')}
            onThemeToggle={toggleTheme}
          />
          <div className="w-full">
            <h1 className="text-4xl font-bold">{text.title}</h1>
            <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{text.intro}</p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="mb-4 text-lg font-semibold">{text.store}</h2>
            <p className="mb-4 text-3xl font-bold" data-testid="zustand-count">
              {count}
            </p>
            <div className="flex gap-2">
              <Button onClick={increment}>{text.increment}</Button>
              <Button variant="secondary" onClick={reset}>
                {text.reset}
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-semibold">{text.form}</h2>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <label className="grid gap-2 text-sm font-medium" htmlFor="example-name">
                {text.name}
                <input
                  id="example-name"
                  className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  {...form.register('name')}
                />
                {form.formState.errors.name && (
                  <span role="alert" className="text-rose-500">
                    {form.formState.errors.name.message}
                  </span>
                )}
              </label>
              <label className="grid gap-2 text-sm font-medium" htmlFor="example-email">
                {text.email}
                <input
                  id="example-email"
                  type="email"
                  className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  {...form.register('email')}
                />
                {form.formState.errors.email && (
                  <span role="alert" className="text-rose-500">
                    {form.formState.errors.email.message}
                  </span>
                )}
              </label>
              <Button type="submit">{text.submit}</Button>
              {submittedName && (
                <p role="status">
                  {text.saved}: {submittedName}
                </p>
              )}
            </form>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-semibold">{text.animation}</h2>
            <motion.div
              className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 p-6 font-semibold text-white"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              {isRussian ? 'Появляюсь при прокрутке' : 'I animate into view'}
            </motion.div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">{text.virtual}</h2>
            <p className="mt-1 mb-3 text-sm opacity-70">{text.items}</p>
            <div
              ref={listRef}
              className="h-64 overflow-auto rounded-lg border border-slate-200 dark:border-slate-700"
              role="region"
              aria-label={
                isRussian
                  ? 'Виртуальный список из 10 000 элементов'
                  : 'Virtualized list of 10,000 items'
              }
              tabIndex={0}
            >
              <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
                {virtualizer.getVirtualItems().map((item) => (
                  <div
                    className="absolute top-0 left-0 flex w-full items-center border-b border-slate-100 px-3 text-sm dark:border-slate-800"
                    key={item.key}
                    style={{ height: item.size, transform: `translateY(${item.start}px)` }}
                  >
                    {virtualItems[item.index]}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default ExamplesPage;

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const ComponentsPage = lazy(() => import('../pages/ComponentsPage'));
const ExamplesPage = lazy(() => import('../pages/ExamplesPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function PageLoadingFallback() {
  const isEnglish = window.localStorage.getItem('starter-language') === 'en';

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 text-slate-600 dark:bg-[#090b12] dark:text-slate-300">
      <p role="status" aria-live="polite">
        {isEnglish ? 'Loading page…' : 'Загрузка страницы…'}
      </p>
    </main>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/examples" element={<ExamplesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;

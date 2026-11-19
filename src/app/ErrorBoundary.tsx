import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('The application encountered an unexpected error.', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const isEnglish = window.localStorage.getItem('starter-language') === 'en';

    return (
      <main className="grid min-h-screen place-items-center bg-slate-100 px-6 py-12 text-slate-950 dark:bg-[#090b12] dark:text-white">
        <section
          aria-labelledby="application-error-title"
          className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-white/10 dark:bg-slate-900"
        >
          <div role="alert">
            <p className="text-sm font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-300">
              {isEnglish ? 'Unexpected error' : 'Непредвиденная ошибка'}
            </p>
            <h1 id="application-error-title" className="mt-3 text-3xl font-bold">
              {isEnglish ? 'Something went wrong' : 'Что-то пошло не так'}
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {isEnglish
                ? 'The page could not be displayed. Reload it to try again.'
                : 'Не удалось отобразить страницу. Перезагрузите её, чтобы попробовать снова.'}
            </p>
          </div>
          <button
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
            onClick={() => window.location.reload()}
            type="button"
          >
            {isEnglish ? 'Reload page' : 'Перезагрузить страницу'}
          </button>
        </section>
      </main>
    );
  }
}

export default ErrorBoundary;

import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function BrokenComponent(): never {
  throw new Error('Test render error');
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows a localized recovery screen when a child crashes', () => {
    window.localStorage.setItem('starter-language', 'ru');
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('heading', { name: 'Что-то пошло не так' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Перезагрузить страницу' })).toBeInTheDocument();
  });
});

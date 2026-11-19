import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
  it('renders in Russian by default', () => {
    window.localStorage.clear();
    renderApp();

    expect(
      screen.getByRole('heading', { name: /создай новый проект на готовой основе/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('@vakkrizey')).toBeInTheDocument();
  });

  it('switches to English and remembers the selected language', async () => {
    window.localStorage.clear();
    document.head.innerHTML = '<meta name="description" content="English description">';
    renderApp();

    fireEvent.click(screen.getByRole('button', { name: 'Switch language to English' }));

    expect(
      screen.getByRole('heading', { name: /build your next project on a solid foundation/i }),
    ).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toContain('Starter');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'A React',
    );
    expect(window.localStorage.getItem('starter-language')).toBe('en');
  });
});

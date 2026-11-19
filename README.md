# React + TypeScript + Vite Starter

A reusable frontend foundation with a responsive home page, language and theme controls, UI components, client-side routing, and tools for formatting, linting, testing, and component development.

> Русская версия документации: [README.ru.md](./README.ru.md).

## Technology stack

### Application

- **React 19** and **React DOM** — UI and browser rendering.
- **TypeScript 6** — static typing for application code.
- **Vite 8** — development server and production bundler.
- **Tailwind CSS 4** — utility-first styling, integrated through the Vite plugin.
- **TanStack Query 5** — fetching, caching, and synchronizing server state in React. The app is already wrapped in `QueryClientProvider`.
- **Zustand 5** — lightweight client-side state. A small counter store demonstrates the setup on `/examples`.
- **React Hook Form 7** and **Zod 4** — form state and schema-based validation, connected through `@hookform/resolvers`.
- **Motion 14** — declarative React animations.
- **TanStack Virtual 3** — virtualized rendering for long lists, so only visible rows are mounted.
- **React Router 7** — client-side routes for the bilingual home page, component gallery, and 404 page.
- **ThemeProvider** — light/dark theme switch with the choice persisted in local storage.

### Code quality and tests

- **ESLint 10** with TypeScript and React Hooks rules.
- **Prettier 3** with Tailwind CSS class sorting.
- **Vitest 5** — unit and component tests in a JSDOM environment.
- **Testing Library** — rendering components and asserting user-visible behavior.
- **Playwright** — end-to-end browser tests for Chromium, Firefox, and WebKit.

### Component development and automation

- **Storybook 10** with React and Vite, accessibility, documentation, onboarding, and Vitest addons. The included UI components have stories and an MDX guide.
- **GitHub Actions** — CI runs ESLint, Prettier, Vitest, app and Storybook builds, and Playwright on pushes and pull requests targeting `main`.

## Requirements

- Node.js 22 or newer
- npm (the lockfile is `package-lock.json`)

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The home page starts in Russian; use `EN` to switch it to English. The theme button toggles light and dark mode.

## Available commands

| Command                   | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `npm run dev`             | Start the Vite development server                               |
| `npm run build`           | Type-check the project and create a production build in `dist/` |
| `npm run preview`         | Serve the production build locally                              |
| `npm run lint`            | Run ESLint across the project                                   |
| `npm run format`          | Format supported files with Prettier                            |
| `npm run format:check`    | Check formatting without changing files                         |
| `npm run test`            | Run Vitest in watch mode                                        |
| `npm run test:run`        | Run Vitest once, suitable for CI                                |
| `npm run e2e`             | Run Playwright end-to-end tests                                 |
| `npm run final`           | Format, lint, test, and build Storybook and the app in order    |
| `npm run e2e:visual`      | Compare page and component screenshots with visual baselines    |
| `npm run e2e:ui`          | Open Playwright's interactive test UI                           |
| `npm run storybook`       | Start Storybook on port 6006                                    |
| `npm run build-storybook` | Build the static Storybook site                                 |

Playwright starts the Vite development server automatically for end-to-end tests. Install its browser binaries when prompted, or run `npx playwright install`.

Before committing, run `npm run final` to execute the full sequence: format, lint, format check, unit tests, browser tests, Storybook build, and production app build. The command stops at the first failure.

Visual baselines are stored under `tests/e2e/visual.spec.ts-snapshots/` and recorded in Chromium. Review screenshot diffs like code changes. After an intentional design update, refresh the baselines with `npm run e2e:visual -- --update-snapshots` and review the changed images before committing.

## Project structure

```text
.
├── .github/workflows/ci.yml  # GitHub Actions checks
├── .storybook/               # Storybook configuration
├── public/
│   ├── brand/                # Brand assets such as the favicon
│   ├── fonts/                # Public font files
│   ├── icons/                # Static icons served by URL
│   └── images/               # Static images served by URL
├── src/
│   ├── app/                   # App routes, providers, and global styles
│   │   ├── App.tsx            # Route definitions
│   │   ├── main.tsx           # React entry point and provider setup
│   │   ├── ThemeProvider.tsx  # Persisted light/dark theme
│   │   ├── query-client.ts    # TanStack Query defaults
│   │   └── styles.css         # Tailwind import and global styles
│   ├── assets/                # Images, fonts, and files imported by source code
│   ├── components/
│   │   ├── ui/                # Button, Input, Card, Badge, Checkbox, Select
│   │   ├── index.ts           # Public component exports
│   │   └── Components.mdx    # Storybook component guide
│   ├── features/              # Feature-specific UI, logic, and API code
│   ├── hooks/                 # Shared React hooks
│   ├── lib/                   # Shared utilities and API clients
│   ├── pages/                 # Home, component gallery, library examples, and 404 pages
│   ├── store/                 # Client-side state stores and their tests
│   ├── test/setup.ts          # Testing Library setup
│   └── types/                 # Shared TypeScript types
├── tests/e2e/                 # Playwright and visual regression tests
├── index.html                 # HTML entry point and page metadata
├── package.json               # Dependencies and npm scripts
├── tsconfig*.json              # TypeScript configuration
└── vite.config.ts              # Vite and Vitest configuration
```

## Customizing the starter

1. Replace the home page in `src/pages/HomePage.tsx` and add application routes in `src/app/App.tsx`.
2. Update the page title, description, language, and favicon reference in `index.html`.
3. Use `src/components/ui/button/` and `src/components/ui/input/` as examples for reusable components. Document component states in `*.stories.tsx` files and cover behavior with colocated tests.
4. Use `public/` for files referenced directly by URL. Put assets imported from TypeScript or CSS in `src/assets/` so Vite can process and fingerprint them.
5. Add unit tests next to components and browser scenarios under `tests/e2e/`.
6. Update this README and `README.ru.md` with project-specific setup instructions.

### Fetching server data

Use `useQuery` for reads and `useMutation` for writes. Keep query functions near the feature or API module that owns the data:

```tsx
import { useQuery } from '@tanstack/react-query';

function Projects() {
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Could not load projects');
      return response.json() as Promise<{ id: string; name: string }[]>;
    },
  });

  if (projectsQuery.isPending) return <p>Loading projects…</p>;
  if (projectsQuery.isError) return <p>{projectsQuery.error.message}</p>;
  return (
    <ul>
      {projectsQuery.data.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}
```

Replace `/api/projects` with an endpoint provided by your backend. TanStack Query manages client-side server data; it does not provide the backend API.

The npm package is named `react-vite-ts-tw-template`, matching this repository. Update `package.json` and the top-level package entries in `package-lock.json` if you rename it.

## Creating a project from this template

1. Create a new repository from this repository's template on GitHub, or clone it and push the code to a new empty repository.
2. Rename the package in `package.json` and both root `name` fields in `package-lock.json`, then run `npm install` to refresh the lockfile.
3. Update the GitHub URL and author handle in `src/app/App.tsx`.
4. Change the page title, description, and favicon in `index.html`.
5. Update the `main` branch filters in `.github/workflows/ci.yml` if your default branch has a different name. GitHub Actions must be enabled in repository settings for CI to run.
6. Adapt the home page, routes, tests, and documentation to your application.

The language switcher updates the visible copy, the document's `lang` attribute, the page title and description, and stores the selected language in browser local storage.

The app includes `/`, `/components`, `/examples`, and a not-found route. The examples page demonstrates Zustand, React Hook Form with Zod, Motion, and TanStack Virtual. Theme selection is available in the header and persists between visits. Import reusable UI elements from `src/components`, for example `import { Button, Card } from '../components'`.

## GitHub Actions

The workflow at `.github/workflows/ci.yml` targets Node.js 22. Its code-check job runs on Ubuntu; Playwright runs on Windows to match the checked-in Chromium visual baselines. It installs dependencies with `npm ci` and runs lint, formatting, Vitest, app and Storybook builds, and browser tests. The package override pins Storybook's docgen plugin to a patched release to keep `npm audit` clear. Keep the workflow aligned with any changes to scripts or the supported Node version.

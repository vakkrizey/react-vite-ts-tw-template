import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations without failing the story test
      // 'error' - fail the story test on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },
};

export default preview;

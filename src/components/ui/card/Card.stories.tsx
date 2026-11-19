import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    children: (
      <>
        <h2 className="text-lg font-semibold">Карточка</h2>
        <p className="mt-2 text-sm opacity-70">Контент карточки размещается здесь.</p>
      </>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

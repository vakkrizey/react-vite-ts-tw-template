import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Статус' },
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Success: Story = { args: { variant: 'success', children: 'Готово' } };
export const Warning: Story = { args: { variant: 'warning', children: 'В ожидании' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Ошибка' } };

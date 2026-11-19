import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Выберите роль',
    placeholder: 'Выберите вариант',
    options: [
      { label: 'Разработчик', value: 'developer' },
      { label: 'Дизайнер', value: 'designer' },
      { label: 'Менеджер', value: 'manager' },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { defaultValue: 'developer' } };
export const Disabled: Story = { args: { disabled: true } };

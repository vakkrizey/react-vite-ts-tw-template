import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Электронная почта',
    placeholder: 'name@example.com',
    type: 'email',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Мы не будем отправлять спам.' },
};

export const WithError: Story = {
  args: { error: 'Укажите корректный адрес электронной почты.' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'name@example.com' },
};

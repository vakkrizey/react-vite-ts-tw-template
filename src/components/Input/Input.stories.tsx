import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const Email: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "example@mail.com",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "example@mail.com",
    error: "Please enter a valid email",
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    placeholder: "This field is disabled",
    disabled: true,
  },
};

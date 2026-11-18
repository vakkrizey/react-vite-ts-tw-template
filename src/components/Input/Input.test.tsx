import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders input with label", () => {
    render(<Input label="Username" />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("renders placeholder", () => {
    render(<Input placeholder="Enter username" />);

    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<Input label="Email" error="Invalid email" />);

    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("sets aria-invalid when error exists", () => {
    render(<Input label="Email" error="Invalid email" />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("can be disabled", () => {
    render(<Input label="Username" disabled />);

    expect(screen.getByLabelText("Username")).toBeDisabled();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();

    render(<Input label="Username" />);

    await user.type(screen.getByLabelText("Username"), "Alex");

    expect(screen.getByLabelText("Username")).toHaveValue("Alex");
  });
});

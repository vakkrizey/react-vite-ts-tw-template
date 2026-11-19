import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Input from './Input';

describe('Input', () => {
  it('associates its label with the input', () => {
    render(<Input label="Email address" type="email" />);

    expect(screen.getByLabelText('Email address')).toHaveAttribute('type', 'email');
  });

  it('announces validation errors accessibly', () => {
    render(<Input label="Email address" error="Enter a valid email." />);

    expect(screen.getByRole('textbox', { name: 'Email address' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByText('Enter a valid email.')).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders its label and calls onClick', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('can be disabled', () => {
    render(<Button disabled>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });
});

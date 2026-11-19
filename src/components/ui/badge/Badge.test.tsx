import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Badge from './Badge';

describe('Badge', () => {
  it('renders a status label', () => {
    render(<Badge variant="success">Ready</Badge>);
    expect(screen.getByText('Ready')).toBeInTheDocument();
  });
});

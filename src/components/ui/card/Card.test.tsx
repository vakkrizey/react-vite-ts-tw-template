import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from './Card';

describe('Card', () => {
  it('renders its content', () => {
    render(
      <Card>
        <h2>Profile</h2>
      </Card>,
    );
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });
});

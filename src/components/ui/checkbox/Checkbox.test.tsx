import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('toggles when its label is clicked', () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

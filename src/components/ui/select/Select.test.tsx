import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Select from './Select';

describe('Select', () => {
  it('renders the configured choices', () => {
    render(<Select label="Role" options={[{ label: 'Developer', value: 'dev' }]} />);
    expect(screen.getByRole('combobox', { name: 'Role' })).toHaveDisplayValue('Developer');
  });
});

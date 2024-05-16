import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('Should render the spinner correctly', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('alert', { name: /loading/i });

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'loading');
  });
});

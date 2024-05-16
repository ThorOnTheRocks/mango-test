import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FixedRange } from '../FixedRange';
import { useFixedRange } from '@/hooks';

jest.mock('../../../../hooks/index', () => ({
  useFixedRange: jest.fn(),
  useDragging: jest.fn().mockReturnValue({ current: null }),
}));

const mockUseFixedRange = {
  values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
  minIndex: 0,
  maxIndex: 5,
  startDragging: jest.fn(),
  stopDragging: jest.fn(),
  onDrag: jest.fn(),
};

describe('FixedRange', () => {
  beforeEach(() => {
    (useFixedRange as jest.Mock).mockReturnValue(mockUseFixedRange);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correctly with given range values', () => {
    render(
      <FixedRange
        rangeValues={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]}
      />
    );

    expect(screen.getByText('1.99')).toBeInTheDocument();
    expect(screen.getByText('70.99')).toBeInTheDocument();
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('Should call startDragging when min bullet is clicked', async () => {
    render(
      <FixedRange
        rangeValues={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]}
      />
    );

    const minSlider = screen.getAllByRole('slider')[0];
    await userEvent.click(minSlider);
    await userEvent.pointer([
      {
        keys: '[MouseLeft]',
        target: minSlider,
      },
    ]);

    expect(mockUseFixedRange.startDragging).toHaveBeenCalledWith(
      'min'
    );
  });

  it('Should call startDragging when max bullet is clicked', async () => {
    render(
      <FixedRange
        rangeValues={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]}
      />
    );

    const maxSlider = screen.getAllByRole('slider')[1];
    await userEvent.click(maxSlider);
    await userEvent.pointer([
      {
        keys: '[MouseLeft]',
        target: maxSlider,
      },
    ]);

    expect(mockUseFixedRange.startDragging).toHaveBeenCalledWith(
      'max'
    );
  });
});

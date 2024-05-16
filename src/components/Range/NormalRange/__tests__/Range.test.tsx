import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Range } from '../Range';
import { useRange, useDragging } from '@/hooks';

jest.mock('../../../../hooks/index', () => ({
  useRange: jest.fn(),
  useDragging: jest.fn(),
}));

const mockUseRange = {
  minValue: 10,
  maxValue: 90,
  updateMinValue: jest.fn(),
  updateMaxValue: jest.fn(),
  startDragging: jest.fn(),
  stopDragging: jest.fn(),
  onDrag: jest.fn(),
};

describe('Range', () => {
  beforeEach(() => {
    (useRange as jest.Mock).mockReturnValue(mockUseRange);
    (useDragging as jest.Mock).mockReturnValue({ current: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correctly with given min and max values', () => {
    render(<Range min={0} max={100} />);

    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('90')).toBeInTheDocument();
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('Should call updateMinValue when the min input is changed', async () => {
    render(<Range min={0} max={100} />);

    const minInput = screen.getByDisplayValue('10');
    fireEvent.change(minInput, { target: { value: '20' } });

    expect(mockUseRange.updateMinValue).toHaveBeenCalledWith(20);
  });

  it('Should call updateMaxValue when the max input is changed', async () => {
    render(<Range min={0} max={100} />);

    const maxInput = screen.getByDisplayValue('90');
    fireEvent.change(maxInput, { target: { value: '80' } });

    expect(mockUseRange.updateMaxValue).toHaveBeenCalledWith(80);
  });

  it('Should call startDragging when min bullet is clicked', async () => {
    render(<Range min={0} max={100} />);

    const minSlider = screen.getAllByRole('slider')[0];
    await userEvent.pointer({
      target: minSlider,
      keys: '[MouseLeft]',
    });

    expect(mockUseRange.startDragging).toHaveBeenCalledWith('min');
  });

  it('Should call startDragging when max bullet is clicked', async () => {
    render(<Range min={0} max={100} />);

    const maxSlider = screen.getAllByRole('slider')[1];
    await userEvent.pointer({
      target: maxSlider,
      keys: '[MouseLeft]',
    });

    expect(mockUseRange.startDragging).toHaveBeenCalledWith('max');
  });
});

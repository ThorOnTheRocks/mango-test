import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FixedRange } from '../FixedRange';
import { useFixedRange, useDragging } from '@/hooks';

jest.mock('../../../../hooks/index');

const mockUseFixedRange = {
  values: [1, 5, 10, 20, 30, 50],
  minIndex: 0,
  maxIndex: 5,
  moveBulletWithKeyboard: jest.fn(),
  startDragging: jest.fn(),
  stopDragging: jest.fn(),
  onDrag: jest.fn(),
};

describe('FixedRange', () => {
  beforeEach(() => {
    (useFixedRange as jest.Mock).mockReturnValue(mockUseFixedRange);
    (useDragging as jest.Mock).mockReturnValue({ current: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correctly with given range values', () => {
    render(<FixedRange rangeValues={mockUseFixedRange.values} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('Should call moveBulletWithKeyboard when ArrowLeft or ArrowRight is pressed', () => {
    render(<FixedRange rangeValues={mockUseFixedRange.values} />);

    const minSlider = screen.getAllByRole('slider')[0];
    fireEvent.keyDown(minSlider, { key: 'ArrowRight' });

    expect(
      mockUseFixedRange.moveBulletWithKeyboard
    ).toHaveBeenCalledWith('min', 'right');

    const maxSlider = screen.getAllByRole('slider')[1];
    fireEvent.keyDown(maxSlider, { key: 'ArrowLeft' });

    expect(
      mockUseFixedRange.moveBulletWithKeyboard
    ).toHaveBeenCalledWith('max', 'left');
  });

  it('Should call startDragging when min bullet is clicked', () => {
    render(<FixedRange rangeValues={mockUseFixedRange.values} />);

    const minSlider = screen.getAllByRole('slider')[0];
    fireEvent.mouseDown(minSlider);

    expect(mockUseFixedRange.startDragging).toHaveBeenCalledWith(
      'min'
    );
  });

  it('Should call startDragging when max bullet is clicked', () => {
    render(<FixedRange rangeValues={mockUseFixedRange.values} />);

    const maxSlider = screen.getAllByRole('slider')[1];
    fireEvent.mouseDown(maxSlider);

    expect(mockUseFixedRange.startDragging).toHaveBeenCalledWith(
      'max'
    );
  });
});

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
  minInput: '10',
  maxInput: '90',
  moveBulletWithKeyboard: jest.fn(),
  updateMinInput: jest.fn(),
  updateMaxInput: jest.fn(),
  validateMinValue: jest.fn(),
  validateMaxValue: jest.fn(),
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

  it('Should call updateMinInput when the min input is changed', () => {
    render(<Range min={0} max={100} />);

    const minInput = screen.getByDisplayValue('10');
    fireEvent.change(minInput, { target: { value: '20' } });

    expect(mockUseRange.updateMinInput).toHaveBeenCalledWith('20');
  });

  it('Should call updateMaxInput when the max input is changed', () => {
    render(<Range min={0} max={100} />);

    const maxInput = screen.getByDisplayValue('90');
    fireEvent.change(maxInput, { target: { value: '80' } });

    expect(mockUseRange.updateMaxInput).toHaveBeenCalledWith('80');
  });

  it('Should validate min value on blur', () => {
    render(<Range min={0} max={100} />);

    const minInput = screen.getByDisplayValue('10');
    fireEvent.blur(minInput);

    expect(mockUseRange.validateMinValue).toHaveBeenCalled();
  });

  it('Should validate max value on blur', () => {
    render(<Range min={0} max={100} />);

    const maxInput = screen.getByDisplayValue('90');
    fireEvent.blur(maxInput);

    expect(mockUseRange.validateMaxValue).toHaveBeenCalled();
  });

  it('Should call validateMinValue on Enter key press', async () => {
    render(<Range min={0} max={100} />);

    const minInput = screen.getByDisplayValue('10');
    await userEvent.type(minInput, '{enter}');

    expect(mockUseRange.validateMinValue).toHaveBeenCalled();
  });

  it('Should call validateMaxValue on Enter key press', async () => {
    render(<Range min={0} max={100} />);

    const maxInput = screen.getByDisplayValue('90');
    await userEvent.type(maxInput, '{enter}');

    expect(mockUseRange.validateMaxValue).toHaveBeenCalled();
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

  it('Should move min bullet with ArrowLeft and ArrowRight keys', () => {
    render(<Range min={0} max={100} />);

    const minSlider = screen.getAllByRole('slider')[0];
    minSlider.focus();
    fireEvent.keyDown(minSlider, { key: 'ArrowLeft' });

    expect(mockUseRange.moveBulletWithKeyboard).toHaveBeenCalledWith(
      'min',
      'left'
    );

    fireEvent.keyDown(minSlider, { key: 'ArrowRight' });

    expect(mockUseRange.moveBulletWithKeyboard).toHaveBeenCalledWith(
      'min',
      'right'
    );
  });

  it('Should move max bullet with ArrowLeft and ArrowRight keys', () => {
    render(<Range min={0} max={100} />);

    const maxSlider = screen.getAllByRole('slider')[1];
    maxSlider.focus();
    fireEvent.keyDown(maxSlider, { key: 'ArrowLeft' });

    expect(mockUseRange.moveBulletWithKeyboard).toHaveBeenCalledWith(
      'max',
      'left'
    );

    fireEvent.keyDown(maxSlider, { key: 'ArrowRight' });

    expect(mockUseRange.moveBulletWithKeyboard).toHaveBeenCalledWith(
      'max',
      'right'
    );
  });
});

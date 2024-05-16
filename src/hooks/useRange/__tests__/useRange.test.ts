import { renderHook, act } from '@testing-library/react';
import { useRange } from '../useRange';
import type {
  UseRangeProps,
  UseRangeReturn,
} from '../useRange.types';

const mockInitialValues: UseRangeProps = {
  min: 0,
  max: 100,
};

describe('useRange', () => {
  let result: { current: UseRangeReturn };

  beforeEach(() => {
    ({ result } = renderHook(() => useRange(mockInitialValues)));
  });

  it('Should initialize with correct values', () => {
    expect(result.current.minValue).toBe(mockInitialValues.min);
    expect(result.current.maxValue).toBe(mockInitialValues.max);
  });

  it('Should update minValue correctly', () => {
    act(() => {
      result.current.updateMinValue(20);
    });
    expect(result.current.minValue).toBe(20);
  });

  it('Should update maxValue correctly', () => {
    act(() => {
      result.current.updateMaxValue(80);
    });
    expect(result.current.maxValue).toBe(80);
  });

  it('Should handle dragging min bullet correctly', () => {
    const sliderRect = {
      left: 0,
      width: 200,
      right: 200,
      top: 0,
      bottom: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    };

    act(() => {
      result.current.startDragging('min');
    });

    act(() => {
      result.current.onDrag(
        new MouseEvent('mousemove', { clientX: 50 }),
        sliderRect
      );
    });

    act(() => {
      result.current.stopDragging();
    });

    expect(result.current.minValue).toBe(25);
  });

  it('Should handle dragging max bullet correctly', () => {
    const sliderRect = {
      left: 0,
      width: 200,
      right: 200,
      top: 0,
      bottom: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    };

    act(() => {
      result.current.startDragging('max');
    });

    act(() => {
      result.current.onDrag(
        new MouseEvent('mousemove', { clientX: 150 }),
        sliderRect
      );
    });

    act(() => {
      result.current.stopDragging();
    });

    expect(result.current.maxValue).toBe(75);
  });
});

import { renderHook, act } from '@testing-library/react';
import { useFixedRange } from '../useFixedRange';
import type {
  UseFixedRangeProps,
  UseFixedRangeReturn,
} from '../useFixedRange.types';

const mockInitialValues: UseFixedRangeProps = {
  rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
};

describe('useFixedRange', () => {
  let result: { current: UseFixedRangeReturn };

  beforeEach(() => {
    ({ result } = renderHook(() => useFixedRange(mockInitialValues)));
  });

  it('Should initialize with correct values', () => {
    expect(result.current.values).toEqual(
      mockInitialValues.rangeValues
    );
    expect(result.current.minIndex).toBe(0);
    expect(result.current.maxIndex).toBe(
      mockInitialValues.rangeValues.length - 1
    );
  });

  it('Should update minIndex and maxIndex correctly on dragging', () => {
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

    expect(result.current.minIndex).toBe(1);

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

    expect(result.current.maxIndex).toBe(4);
  });
});

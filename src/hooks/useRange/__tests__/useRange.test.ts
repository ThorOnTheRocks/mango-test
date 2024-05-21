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
    expect(result.current.minInput).toBe(
      String(mockInitialValues.min)
    );
    expect(result.current.maxInput).toBe(
      String(mockInitialValues.max)
    );
  });

  it('Should update minInput correctly', () => {
    act(() => {
      result.current.updateMinInput('20');
    });
    expect(result.current.minInput).toBe('20');
  });

  it('Should update maxInput correctly', () => {
    act(() => {
      result.current.updateMaxInput('80');
    });
    expect(result.current.maxInput).toBe('80');
  });

  it('Should validate and update minValue correctly', () => {
    act(() => {
      result.current.updateMinInput('20');
    });
    act(() => {
      result.current.validateMinValue();
    });
    expect(result.current.minValue).toBe(20);
    expect(result.current.minInput).toBe('20');
  });

  it('Should validate and update maxValue correctly', () => {
    act(() => {
      result.current.updateMaxInput('80');
    });
    act(() => {
      result.current.validateMaxValue();
    });
    expect(result.current.maxValue).toBe(80);
    expect(result.current.maxInput).toBe('80');
  });

  it('Should handle dragging min bullet correctly', () => {
    const sliderRect = {
      left: 0,
      width: 200,
    } as DOMRect;

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
    expect(result.current.minInput).toBe('25');
  });

  it('Should handle dragging max bullet correctly', () => {
    const sliderRect = {
      left: 0,
      width: 200,
    } as DOMRect;

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
    expect(result.current.maxInput).toBe('75');
  });

  it('Should move min bullet with keyboard correctly', () => {
    act(() => {
      result.current.moveBulletWithKeyboard('min', 'right');
    });
    expect(result.current.minValue).toBe(1);
    expect(result.current.minInput).toBe('1');

    act(() => {
      result.current.moveBulletWithKeyboard('min', 'left');
    });
    expect(result.current.minValue).toBe(0);
    expect(result.current.minInput).toBe('0');
  });

  it('Should move max bullet with keyboard correctly', () => {
    act(() => {
      result.current.moveBulletWithKeyboard('max', 'left');
    });
    expect(result.current.maxValue).toBe(99);
    expect(result.current.maxInput).toBe('99');

    act(() => {
      result.current.moveBulletWithKeyboard('max', 'right');
    });
    expect(result.current.maxValue).toBe(100);
    expect(result.current.maxInput).toBe('100');
  });
});

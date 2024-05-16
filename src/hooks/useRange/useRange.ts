import { useState, useEffect, useCallback } from 'react';
import type {
  UseRangeProps,
  DraggingState,
  UseRangeReturn,
} from './useRange.types';

export function useRange({
  min,
  max,
}: UseRangeProps): UseRangeReturn {
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [dragging, setDragging] = useState<DraggingState>(null);

  useEffect(() => {
    setMinValue(min);
    setMaxValue(max);
  }, [min, max]);

  const updateMinValue = useCallback(
    (value: number) => {
      if (value >= min && value <= maxValue) {
        setMinValue(value);
      }
    },
    [maxValue, min]
  );

  const updateMaxValue = useCallback(
    (value: number) => {
      if (value <= max && value >= minValue) {
        setMaxValue(value);
      }
    },
    [minValue, max]
  );

  const startDragging = (bullet: 'min' | 'max') => {
    setDragging(bullet);
  };

  const stopDragging = () => {
    setDragging(null);
  };

  const onDrag = useCallback(
    (event: MouseEvent, sliderRect: DOMRect) => {
      if (dragging) {
        const x = event.clientX - sliderRect.left;
        const value = Math.round(
          (x / sliderRect.width) * (max - min) + min
        );

        if (dragging === 'min') {
          const newMinValue = Math.max(
            min,
            Math.min(value, maxValue - 1)
          );
          updateMinValue(newMinValue);
        } else {
          const newMaxValue = Math.min(
            max,
            Math.max(value, minValue + 1)
          );
          updateMaxValue(newMaxValue);
        }
      }
    },
    [
      dragging,
      minValue,
      maxValue,
      updateMaxValue,
      updateMinValue,
      min,
      max,
    ]
  );

  return {
    minValue,
    maxValue,
    updateMinValue,
    updateMaxValue,
    startDragging,
    stopDragging,
    onDrag,
  };
}

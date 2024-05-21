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
  const [minInput, setMinInput] = useState<string>(String(min));
  const [maxInput, setMaxInput] = useState<string>(String(max));
  const [dragging, setDragging] = useState<DraggingState>(null);

  useEffect(() => {
    setMinValue(min);
    setMaxValue(max);
    setMinInput(String(min));
    setMaxInput(String(max));
  }, [min, max]);

  const updateMinInput = useCallback((value: string) => {
    setMinInput(value);
  }, []);

  const updateMaxInput = useCallback((value: string) => {
    setMaxInput(value);
  }, []);

  const validateMinValue = useCallback(() => {
    const numericValue = Number(minInput);
    if (minInput === '') {
      setMinValue(min);
      setMinInput(String(min));
    } else if (numericValue < min || numericValue >= maxValue) {
      setMinInput(String(minValue));
    } else {
      setMinValue(numericValue);
    }
  }, [minInput, min, maxValue, minValue]);

  const validateMaxValue = useCallback(() => {
    const numericValue = Number(maxInput);
    if (maxInput === '') {
      setMaxValue(max);
      setMaxInput(String(max));
    } else if (numericValue > max || numericValue <= minValue) {
      setMaxInput(String(maxValue));
    } else {
      setMaxValue(numericValue);
    }
  }, [maxInput, max, minValue, maxValue]);

  const startDragging = useCallback((bullet: 'min' | 'max') => {
    setDragging(bullet);
  }, []);

  const stopDragging = useCallback(() => {
    setDragging(null);
  }, []);

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
          setMinValue(newMinValue);
          setMinInput(String(newMinValue));
        } else {
          const newMaxValue = Math.min(
            max,
            Math.max(value, minValue + 1)
          );
          setMaxValue(newMaxValue);
          setMaxInput(String(newMaxValue));
        }
      }
    },
    [dragging, maxValue, max, min, minValue]
  );

  const moveBulletWithKeyboard = useCallback(
    (bullet: 'min' | 'max', direction: 'left' | 'right') => {
      if (bullet === 'min') {
        const newMinValue =
          direction === 'left'
            ? Math.max(min, minValue - 1)
            : Math.min(maxValue - 1, minValue + 1);
        setMinValue(newMinValue);
        setMinInput(String(newMinValue));
      } else {
        const newMaxValue =
          direction === 'left'
            ? Math.max(minValue + 1, maxValue - 1)
            : Math.min(max, maxValue + 1);
        setMaxValue(newMaxValue);
        setMaxInput(String(newMaxValue));
      }
    },
    [max, maxValue, min, minValue]
  );

  return {
    minValue,
    maxValue,
    minInput,
    maxInput,
    moveBulletWithKeyboard,
    updateMinInput,
    updateMaxInput,
    validateMinValue,
    validateMaxValue,
    startDragging,
    stopDragging,
    onDrag,
  };
}

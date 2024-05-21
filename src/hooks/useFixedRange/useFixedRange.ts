import { useState, useCallback, useEffect } from 'react';
import type {
  UseFixedRangeProps,
  UseFixedRangeReturn,
  DraggingState,
} from './useFixedRange.types';

export function useFixedRange({
  rangeValues,
}: UseFixedRangeProps): UseFixedRangeReturn {
  const [values, setValues] = useState(rangeValues);
  const [minIndex, setMinIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(values.length - 1);
  const [dragging, setDragging] = useState<DraggingState>(null);

  useEffect(() => {
    setValues(rangeValues);
    setMinIndex(0);
    setMaxIndex(rangeValues.length - 1);
  }, [rangeValues]);

  const startDragging = useCallback((bullet: DraggingState) => {
    setDragging(bullet);
  }, []);

  const stopDragging = useCallback(() => {
    setDragging(null);
  }, []);

  const onDrag = useCallback(
    (event: MouseEvent, sliderRect: DOMRect) => {
      if (dragging) {
        const x = event.clientX - sliderRect.left;
        const index = Math.round(
          (x / sliderRect.width) * (values.length - 1)
        );
        if (dragging === 'min') {
          setMinIndex(Math.max(0, Math.min(index, maxIndex - 1)));
        } else if (dragging === 'max') {
          setMaxIndex(
            Math.min(values.length - 1, Math.max(index, minIndex + 1))
          );
        }
      }
    },
    [dragging, maxIndex, minIndex, values.length]
  );

  const moveBulletWithKeyboard = useCallback(
    (bullet: 'min' | 'max', direction: 'left' | 'right') => {
      if (bullet === 'min') {
        const newMinIndex =
          direction === 'left'
            ? Math.max(0, minIndex - 1)
            : Math.min(maxIndex - 1, minIndex + 1);
        setMinIndex(newMinIndex);
      } else {
        const newMaxIndex =
          direction === 'left'
            ? Math.max(minIndex + 1, maxIndex - 1)
            : Math.min(values.length - 1, maxIndex + 1);
        setMaxIndex(newMaxIndex);
      }
    },
    [minIndex, maxIndex, values.length]
  );

  return {
    values,
    minIndex,
    maxIndex,
    startDragging,
    stopDragging,
    onDrag,
    moveBulletWithKeyboard,
  };
}

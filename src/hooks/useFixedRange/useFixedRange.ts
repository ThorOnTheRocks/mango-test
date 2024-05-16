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

  const startDragging = (bullet: DraggingState) => {
    setDragging(bullet);
  };

  const stopDragging = () => {
    setDragging(null);
  };

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

  return {
    values,
    minIndex,
    maxIndex,
    startDragging,
    stopDragging,
    onDrag,
  };
}

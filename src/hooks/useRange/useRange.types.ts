export type UseRangeProps = {
  min: number;
  max: number;
};

export type DraggingState = 'min' | 'max' | null;

export type UseRangeReturn = {
  minValue: number;
  maxValue: number;
  updateMinValue: (value: number) => void;
  updateMaxValue: (value: number) => void;
  startDragging: (bullet: 'min' | 'max') => void;
  stopDragging: () => void;
  onDrag: (event: MouseEvent, sliderRect: DOMRect) => void;
};

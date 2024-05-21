export interface UseRangeProps {
  min: number;
  max: number;
}

export type DraggingState = 'min' | 'max' | null;

export interface UseRangeReturn {
  minValue: number;
  maxValue: number;
  minInput: string;
  maxInput: string;
  updateMinInput: (value: string) => void;
  updateMaxInput: (value: string) => void;
  validateMinValue: () => void;
  validateMaxValue: () => void;
  startDragging: (bullet: 'min' | 'max') => void;
  stopDragging: () => void;
  onDrag: (event: MouseEvent, sliderRect: DOMRect) => void;
  moveBulletWithKeyboard: (
    bullet: 'min' | 'max',
    direction: 'left' | 'right'
  ) => void;
}

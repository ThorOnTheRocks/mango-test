export type UseFixedRangeProps = {
  rangeValues: number[];
};

export type DraggingState = 'min' | 'max' | null;

export type UseFixedRangeReturn = {
  values: number[];
  minIndex: number;
  maxIndex: number;
  startDragging: (bullet: DraggingState) => void;
  stopDragging: () => void;
  onDrag: (event: MouseEvent, sliderRect: DOMRect) => void;
  moveBulletWithKeyboard: (
    bullet: 'min' | 'max',
    direction: 'left' | 'right'
  ) => void;
};

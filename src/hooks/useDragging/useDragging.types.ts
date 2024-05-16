export type UseDraggingProps = {
  onDrag: (event: MouseEvent, sliderRect: DOMRect) => void;
  stopDragging: () => void;
};

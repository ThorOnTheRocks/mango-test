import { useEffect, useRef } from 'react';
import type { UseDraggingProps } from './useDragging.types';

export function useDragging({
  onDrag,
  stopDragging,
}: UseDraggingProps): React.RefObject<HTMLDivElement> {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (sliderRef.current) {
        const sliderRect = sliderRef.current.getBoundingClientRect();
        onDrag(event, sliderRect);
      }
    };

    const handleMouseUp = () => {
      stopDragging();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onDrag, stopDragging]);

  return sliderRef;
}

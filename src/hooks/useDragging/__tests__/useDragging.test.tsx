import { fireEvent, render } from '@testing-library/react';
import { useDragging } from '../useDragging';

interface TestComponentProps {
  onDrag: (event: MouseEvent, rect: DOMRect) => void;
  stopDragging: () => void;
}

const TestComponent: React.FC<TestComponentProps> = ({
  onDrag,
  stopDragging,
}) => {
  const ref = useDragging({ onDrag, stopDragging });

  return (
    <div
      ref={ref}
      role="region"
      style={{
        width: '200px',
        height: '100px',
        background: 'white',
      }}
    />
  );
};

describe('useDragging', () => {
  let onDragMock: jest.Mock;
  let stopDraggingMock: jest.Mock;

  beforeEach(() => {
    onDragMock = jest.fn();
    stopDraggingMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call onDrag when mouse moves', () => {
    const { getByRole } = render(
      <TestComponent
        onDrag={onDragMock}
        stopDragging={stopDraggingMock}
      />
    );

    const div = getByRole('region');

    jest.spyOn(div, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      left: 0,
      width: 200,
      height: 100,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    fireEvent.mouseMove(window, { clientX: 100 });

    expect(onDragMock).toHaveBeenCalledTimes(1);
  });

  it('Should call stopDragging when mouse is released', () => {
    render(
      <TestComponent
        onDrag={onDragMock}
        stopDragging={stopDraggingMock}
      />
    );

    fireEvent.mouseUp(window);

    expect(stopDraggingMock).toHaveBeenCalledTimes(1);
  });
});

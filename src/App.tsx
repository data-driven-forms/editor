import React, { useRef } from 'react';
import './app.css';
import Canvas from './canvas';
import Component from './component';
import DropCursor from './drop-cursor';

import useBuilderState from './hooks/use-builder-state';

function App() {
  const [state, dispatch] = useBuilderState()

  const dragAndDropData = useRef<{
    position: { x: number; y: number };
    dropIndex: number;
    dropParent: any | null;
  }>({ position: { x: 0, y: 0 }, dropIndex: -1, dropParent: null });

  const draggingElementRef = useRef<HTMLDivElement>();

  const handleDrag = React.useCallback((e: MouseEvent) => {
    dragAndDropData.current.position = { x: e.clientX, y: e.clientY };
    if (draggingElementRef.current) {
      draggingElementRef.current.style.left = `${dragAndDropData.current.position.x}px`;
      draggingElementRef.current.style.top = `${dragAndDropData.current.position.y}px`;
    }
  }, []);

  const handleDragStart = React.useCallback(
    (component, e) => {
      dragAndDropData.current.position = { x: e.clientX, y: e.clientY };
      dispatch({
        type: 'DRAG_START',
        component: component,
      });
    },
    [dispatch],
  );

  const handleCanvasMouseUp = React.useCallback(() => {
    dispatch({
      type: 'DRAG_DROP',
      dropParent: dragAndDropData.current.dropParent,
      dropIndex: dragAndDropData.current.dropIndex,
    });
  }, [dispatch]);

  return (
    <div className='builder'>
      <div className='components'>
        <Component onDragStart={handleDragStart} />
        <Component onDragStart={handleDragStart} />
        {state.draggingElement && <DropCursor />}
      </div>
      <Canvas onMouseUp={handleCanvasMouseUp}/>
    </div>
  );
}

export default App;

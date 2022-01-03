import React from 'react';
import './app.css';
import Canvas from './canvas';
import MenuItem from './menu-item';
import DropCursor from './drop-cursor';
import BuilderContextDispatch from './hooks/builder-context-dispatch';
import BuilderContextState from './hooks/builder-context-state';

import useBuilderState from './hooks/use-builder-state';

function pauseEvent(e: any) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

function App() {
  const [state, dispatch] = useBuilderState()

  const handleDragStart = React.useCallback(
    (component, isContainer, e) => {
      pauseEvent(e);
      dispatch({
        type: 'DRAG_START',
        component,
        isContainer
      });
    },
    [dispatch],
  );

  const handleCanvasMouseUp = React.useCallback(({ container: targetContainer, position }) => {
    dispatch({
      type: 'DRAG_DROP',
      targetContainer,
      position
    });
  }, [dispatch]);

  return (
    <BuilderContextDispatch.Provider value={dispatch}>
      <BuilderContextState.Provider value={state}>
        <div className='builder'>
          <div className='components'>
            <MenuItem onDragStart={handleDragStart} label="Text field" component="text-field" />
            <MenuItem onDragStart={handleDragStart} label="Select" component="select" />
            <MenuItem onDragStart={handleDragStart} label="Form group" component="form-group" isContainer />
            {state.draggingElement && <DropCursor onMouseUp={handleCanvasMouseUp} />}
          </div>
          <Canvas id="form" isStatic />
        </div>
      </BuilderContextState.Provider>
    </BuilderContextDispatch.Provider>
  );
}

export default App;

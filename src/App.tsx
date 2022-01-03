import React from 'react';
import './app.css';
import Canvas from './canvas';
import MenuItem from './menu-item';
import DropCursor from './drop-cursor';
import BuilderContextDispatch from './hooks/builder-context-dispatch';
import BuilderContextState from './hooks/builder-context-state';

import useBuilderState from './hooks/use-builder-state';

function App() {
  const [state, dispatch] = useBuilderState()

  return (
    <BuilderContextDispatch.Provider value={dispatch}>
      <BuilderContextState.Provider value={state}>
        <div className='builder'>
          <div className='components'>
            <MenuItem label="Text field" component="text-field" />
            <MenuItem label="Select" component="select" />
            <MenuItem label="Form group" component="form-group" isContainer />
            {state.draggingElement && <DropCursor />}
          </div>
          <Canvas id="form" isStatic />
        </div>
      </BuilderContextState.Provider>
    </BuilderContextDispatch.Provider>
  );
}

export default App;

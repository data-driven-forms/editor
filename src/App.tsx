import React from 'react';
import './app.css';
import Canvas from './canvas';
import MenuItem from './menu-item';

import Editor from './hooks/editor';

function App() {
  return (
    <Editor>
        <div className='builder'>
          <div className='components'>
            <MenuItem label="Text field" component="text-field" />
            <MenuItem label="Select" component="select" />
            <MenuItem label="Form group" component="form-group" isContainer />
          </div>
          <Canvas isRoot />
        </div>
    </Editor>
  );
}

export default App;

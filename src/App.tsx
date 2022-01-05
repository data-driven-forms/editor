import React from 'react';
import './app.css';

import Container from './editor-core/container';
import MenuItem from './editor-core/menu-item';
import Editor from './editor-core/editor';

function App() {
  return (
    <Editor>
        <div className='builder'>
          <div className='components'>
            <MenuItem component="text-field">Text field</MenuItem>
            <MenuItem component="select">Select</MenuItem>
            <MenuItem component="form-group" isContainer>Form group</MenuItem>
          </div>
          <Container isRoot />
        </div>
    </Editor>
  );
}

export default App;

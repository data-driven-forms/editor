import React from 'react';
import './app.css';

import Container, { ContainerProps } from './editor-core/container';
import MenuItem from './editor-core/menu-item';
import Editor from './editor-core/editor';
import Component, { ComponentProps } from './editor-core/component';
import useState from './dnd/use-state';

const ComponentWrapper: React.FC<ComponentProps> = (props) => {
  const state = useState();


  return <Component
    {...props}
    style={{ padding: 8, margin: 5, border: '2px dotted #0508FF', display: 'flex', opacity: state.draggingElement === props.id ? 0.5 : 1 }}
    HandleProps={{
      style: { marginLeft: 'auto', background: 'black', color: 'white', fontWeight: 'bold' },
      children: 'Handle'
    }}
  />
}

const ContainerWrapper: React.FC<ContainerProps> = (props) => <Container
  {...props}
  HandleProps={{
    style: { marginLeft: 'auto', background: 'black', color: 'white', fontWeight: 'bold' },
    children: 'Handle'
  }}
  ListProps={{
    style: { minWidth: '80%' }
  }}
  className='canvas'
  style={{ display: 'flex' }}
/>


function App() {
  return (
    <Editor>
      <div className='builder'>
        <div className='components'>
          <MenuItem component="text-field">Text field</MenuItem>
          <MenuItem component="select">Select</MenuItem>
          <MenuItem component="form-group" isContainer>Form group</MenuItem>
        </div>
        <ContainerWrapper isRoot Component={ComponentWrapper} />
      </div>
    </Editor>
  );
}

export default App;

import React from 'react';

import { Menu, Pane, Text, DragHandleVerticalIcon } from 'evergreen-ui';

import './app.css';

import Container, { ContainerProps } from './editor-core/container';
import MenuItem, { MenuItemProps } from './editor-core/menu-item';
import Editor from './editor-core/editor';
import Component, { ComponentProps } from './editor-core/component';
import useState from './dnd/use-state';
import PropertiesCard from './properties-card';

const ComponentWrapper: React.FC<ComponentProps> = (props) => {
  const state = useState();

  return <Component
    {...props}
    style={{ padding: 8, margin: 5, border: state.selectedComponent === props.id ? '2px dotted red' : '2px dotted #474d66', display: 'flex', opacity: state.draggingElement === props.id ? 0.5 : 1 }}
    HandleProps={{
      style: { marginLeft: 'auto' },
      size: 24,
      className: 'handle'
    }}
    Handle={DragHandleVerticalIcon}
  />
}

const ContainerWrapper: React.FC<ContainerProps> = (props) => <Container
  {...props}
  HandleProps={{
    style: { marginLeft: 'auto' },
    size: 24,
    className: 'handle'
  }}
  Handle={DragHandleVerticalIcon}
  ListProps={{
    style: { minWidth: '80%' }
  }}
  className='canvas'
  style={{ display: 'flex' }}
/>

const MenuItemWrapper: React.FC<MenuItemProps> = (props) => <MenuItem Component={Menu.Item} {...props} />

function App() {
  return (
    <Editor>
      <Pane background='tint1' marginBottom={8} padding={16} >
        <Text>Data Driven Forms Pro Editor</Text>
      </Pane>
      <div className='builder'>
        <Pane border className='components'>
          <Menu>
            <Menu.Group title="Components">
              <MenuItemWrapper component="text-field" >Text field</MenuItemWrapper>
              <MenuItemWrapper component="select">Select</MenuItemWrapper>
              <MenuItemWrapper component="form-group" isContainer>Form group</MenuItemWrapper>
            </Menu.Group>
          </Menu>
        </Pane>
        <ContainerWrapper isRoot Component={ComponentWrapper} />
        <PropertiesCard />
      </div>
    </Editor>
  );
}

export default App;

import React from 'react';

import { Menu, Pane, DragHandleVerticalIcon, majorScale } from 'evergreen-ui';

import './app.css';

import Container, { ContainerProps } from './editor-core/container';
import MenuItem, { MenuItemProps } from './editor-core/menu-item';
import Editor from './editor-core/editor';
import Component, { ComponentProps } from './editor-core/component';
import useState from './dnd/use-state';
import PropertiesCard from './properties-card';
import TopNav from './top-nav';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentMapper from './evergreen-component-mapper/component-mapper';

const ComponentWrapper: React.FC<ComponentProps> = (props) => {
  const state = useState();

  return <Component
    {...props}
    style={{ padding: 8, margin: 5, border: state.selectedComponent === props.id ? '2px dotted red' : '2px dotted #474d66', display: 'flex', opacity: state.draggingElement === props.id ? 0.5 : 1 }}
    HandleProps={{
      style: { marginLeft: 'auto' },
      size: 24,
      cursor: 'grab'
    }}
    Handle={DragHandleVerticalIcon}
  />
}

const ContainerWrapper: React.FC<ContainerProps> = (props) => {
  return <Container
    {...props}
    HandleProps={{
      style: { marginLeft: 'auto' },
      size: 24,
      cursor: 'grab'
    }}
    Handle={DragHandleVerticalIcon}
    ListProps={{
      style: { minWidth: 'calc(100% - 24px)' }
    }}
    className='canvas'
    style={{ display: 'flex', ...(props.isRoot && { border: '2px dotted rgb(71 77 102 / 50%)' }) }}
  />
}

const MenuItemWrapper: React.FC<MenuItemProps> = (props) => <MenuItem Component={Menu.Item} {...props} />

function App() {
  return (
    <Pane
      display="flex"
      flexDirection="column"
      height="100vh"
    >
      <Editor
        DropCursorProps={{
          CursorProps: {
            className: 'drop-cursor'
          }
        }}
        componentMapper={componentMapper}
      >
        <TopNav />
        <Pane flex="1" width="100%" display="flex">
          <Pane
            display="flex"
            position="sticky"
            flexDirection="column"
            overflowY="auto"
            maxHeight="calc(100vh - 48px)"
            paddingX={majorScale(1)}
            top="48px"
          >
            <Menu>
              <Menu.Group title="Components">
                {Object.keys(componentMapper).map(key => <MenuItemWrapper key={key} component={key}>
                  {key.replaceAll('-', ' ')}
                </MenuItemWrapper>)}
              </Menu.Group>
            </Menu>
          </Pane>
          <FormRenderer
            schema={{ fields: [] }}
            onSubmit={() => undefined}
            componentMapper={componentMapper}
            FormTemplate={() => <ContainerWrapper isRoot Component={ComponentWrapper} Container={ContainerWrapper} />}
          />
          <PropertiesCard componentMapper={componentMapper} />
        </Pane>
      </Editor>
    </Pane>
  );
}

export default App;

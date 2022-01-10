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
import { componentMapper } from '@data-driven-forms/mui-component-mapper';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AnyObject } from './dnd/types';
//import componentMapper from './evergreen-component-mapper/component-mapper';

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

const fields = [
  {
    name: 'component',
    component: 'select',
    label: 'Component',
    description: 'Component type.',
    isRequired: true,
    validate: [{ type: 'required' }],
    options: Object.keys(componentMapper).map(key => ({
      label: key.replaceAll('-', ' '),
      value: key
    }))
  },
  {
    name: 'name',
    component: 'text-field',
    label: 'Name',
    description: 'Name of the field. You can use dot notation to nest variables.',
    isRequired: true,
    validate: [{ type: 'required' }]
  },
  {
    name: 'text-field-group',
    component: 'sub-form',
    condition: { when: 'component', is: ['text-field', 'select'] },
    fields: [
      { component: 'text-field', name: 'label', label: 'Label', description: 'Label of the field.' },
      { component: 'text-field', name: 'description', label: 'Description', description: 'Description of the field.' },
      { component: 'text-field', name: 'hint', label: 'Hint', description: 'Hint of the field.' }
    ]
  }]

const componentInitialProps: AnyObject = {
  'dual-list-select': {
    options: []
  },
  'sub-form': {
    fields: []
  },
  'field-array': {
    fields: []
  },
  wizard: {
    fields: [{ name: 'step-1', fields: [] }]
  },
  tabs: {
    fields: []
  }
}

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  {Object.keys(componentMapper).map(key => <MenuItemWrapper key={key} component={key} componentInitialProps={componentInitialProps[key]}>
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
            <PropertiesCard fields={fields} />
          </Pane>
        </Editor>
      </Pane>
    </LocalizationProvider>
  );
}

export default App;

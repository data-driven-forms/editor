import React from 'react';

import { DragHandleVerticalIcon } from 'evergreen-ui';

import Component, { ComponentProps } from './editor-core/component';
import useState from './dnd/use-state';


const ComponentWrapper: React.FC<ComponentProps> = (props) => {
    const state = useState();

    return <Component
        {...props}
        style={{
            padding: 8,
            margin: 5,
            display: 'flex',
            opacity: state.draggingElement === props.id ? 0.3 : 1,
            boxShadow: state.selectedComponent === props.id ? 'rgb(112 112 112) 2px 5px 5px' : '1px 5px 5px #b3b3b3',
            cursor: 'pointer'
        }}
        HandleProps={{
            style: { marginLeft: 'auto' },
            size: 24,
            cursor: 'grab'
        }}
        Handle={DragHandleVerticalIcon}
    />
}

export default ComponentWrapper;

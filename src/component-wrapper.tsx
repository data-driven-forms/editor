import React from 'react';

import { DragHandleVerticalIcon } from 'evergreen-ui';

import Component, { ComponentProps } from './editor-core/component';
import useState from './dnd/use-state';


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

export default ComponentWrapper;

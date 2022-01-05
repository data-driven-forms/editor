import React from 'react';
import useComponent from '../../dnd/use-component';
import useHandle from '../../dnd/use-handle';
import useState from '../../dnd/use-state';

const Component = ({ id, container }: any) => {
    const state = useState();

    const events = useHandle({ component: id, sourceContainer: container });
    const { ref, component } = useComponent({ id });

    return <div ref={ref} style={{ padding: 8, margin: 5, border: '2px dotted #0508FF', display: 'flex', opacity: state.draggingElement === id ? 0.5 : 1 }}>
        <div>{component.name}</div>
        <div
            style={{ marginLeft: 'auto', background: 'black', color: 'white', fontWeight: 'bold' }}
            {...events}
        >
            handle
        </div>
    </div>
}

export default Component;

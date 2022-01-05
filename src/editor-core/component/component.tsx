import React, { createRef, useEffect } from 'react';

import useDispatch from '../../dnd/use-dispatch';
import useHandle from '../../dnd/use-handle';
import useState from '../../dnd/use-state';

const Component = ({ id, container }: any) => {
    const state = useState();
    const dispatch = useDispatch();

    const events = useHandle({ component: id, sourceContainer: container });

    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        if (ref.current) {
            dispatch({ type: 'UPDATE_COMPONENT', id, ref: ref.current })
        }
    }, [])

    const component = state.components[id];

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

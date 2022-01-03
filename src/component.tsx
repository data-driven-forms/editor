import React, { createRef, useEffect } from 'react';
import useDispatch from './hooks/use-dispatch';

import useState from './hooks/use-state';

const Component = ({ id }: any) => {
    const state = useState();
    const dispatch = useDispatch();

    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        if (ref.current) {
            dispatch({ type: 'UPDATE_COMPONENT', id, ref: ref.current })
        }
    }, [])

    const component = state.components[id]

    return <div ref={ref} style={{ padding: 8, margin: 5, border: '2px dotted #0508FF', display: 'flex' }}>
        <div>{component.name}</div>
        <div style={{ marginLeft: 'auto' }}>handle</div>
    </div>
}

export default Component;

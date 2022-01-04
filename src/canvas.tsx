import React, { createRef, useEffect } from "react";
import Component from "./component";
import useDispatch from "./hooks/use-dispatch";
import useHandle from "./hooks/use-handle";
import useState from "./hooks/use-state";

const Canvas = ({ id, container }: any) => {
    const state = useState();
    const dispatch = useDispatch();
    const ref = createRef<HTMLDivElement>();

    const { children } = state.containers[id] || { children: [] };

    const events = useHandle({ component: id, sourceContainer: container, isContainer: true })

    useEffect(() => {
        if (ref.current) {
            dispatch({ type: 'UPDATE_CONTAINER', id, ref: ref.current })
        }
    }, [])


    return <div className='canvas' ref={ref} style={{ display: 'flex' }}>
        <div style={{ minWidth: '80%' }}>

            {children.map((key: string) => {
                if (!state.components[key]) {
                    return <Canvas key={key} id={key} container={id} />
                }
                return <Component key={key} id={key} container={id} />
            })}
        </div>
        {container && <div
            style={{ marginLeft: 'auto', background: 'black', color: 'white', fontWeight: 'bold' }}
            {...events}
        >
            handle
        </div>}
    </div>
}

export default Canvas;

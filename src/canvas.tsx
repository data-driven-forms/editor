import React, { createRef, useEffect } from "react";
import Component from "./component";
import useDispatch from "./hooks/use-dispatch";
import useState from "./hooks/use-state";

const Canvas = ({ id, isStatic }: any) => {
    const state = useState();
    const dispatch = useDispatch();
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        if (isStatic && ref.current) {
            dispatch({ type: 'ADD_CONTAINER', id, ref: ref.current, isStatic })
        } else if (ref.current) {
            dispatch({ type: 'UPDATE_CONTAINER', id, ref: ref.current })
        }
    }, [])

    const { children } = state.containers[id] || { children: [] };

    return <div className='canvas' ref={ref}>
        {children.map((key: string) => {
            if(!state.components[key]) {
                return <Canvas key={key} id={key} />
            }

            return <Component key={key} id={key}/>
        })}
    </div>
}

export default Canvas;

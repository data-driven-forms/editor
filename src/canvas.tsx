import React, { createRef, useEffect } from "react";
import useDispatch from "./hooks/use-dispatch";
import useState from "./hooks/use-state";

const Canvas = ({ id, isStatic }: any) => {
    const state = useState();
    const dispatch = useDispatch();
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect().toJSON();

            console.log(rect)

            dispatch({ type: 'ADD_CONTAINER', id, ref: ref.current, isStatic })
        }
    }, [])

    const { children } = state.containers[id] || { children: []};

    return <div className='canvas' ref={ref}>
        {children.map(() =>
            <div style={{ width: 100, height: 100, margin: 5, background: 'black' }} />
        )}
    </div>
}

export default Canvas;

import React from "react";
import Component from "../component";

import useHandle from '../../dnd/use-handle';
import useState from '../../dnd/use-state';
import useContainer from "../../dnd/use-container";

const Canvas = ({ id, container: sourceContainer, isRoot }: any) => {
    const state = useState();

    const { ref, container, id: containerId } = useContainer({ id, isRoot })
    const events = useHandle({ component: containerId, sourceContainer, isContainer: true })

    return <div className='canvas' ref={ref} style={{ display: 'flex' }}>
        <div style={{ minWidth: '80%' }}>
            {container.children.map((key: string) => {
                if (!state.components[key]) {
                    return <Canvas key={key} id={key} container={containerId} />
                }
                return <Component key={key} id={key} container={containerId} />
            })}
        </div>
        {sourceContainer && <div
            style={{ marginLeft: 'auto', background: 'black', color: 'white', fontWeight: 'bold' }}
            {...events}
        >
            handle
        </div>}
    </div>
}

export default Canvas;

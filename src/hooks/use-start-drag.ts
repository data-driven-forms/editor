import { MouseEvent, TouchEvent, useCallback } from "react";
import useDispatch from "./use-dispatch";

function pauseEvent(e: MouseEvent | TouchEvent) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault && e.type !== 'touchstart') e.preventDefault();
}

interface UseStartDragConfig {
    component: string;
    isContainer?: boolean;
    sourceContainer?: string;
}

const handleMouseDown = (config: UseStartDragConfig, dispatch: Function) => (e: MouseEvent | TouchEvent) => {
    pauseEvent(e);
    dispatch({
        type: 'DRAG_START',
        ...config
    });
}

const useStartDrag = (config: UseStartDragConfig) => {
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const startDrag = useCallback(handleMouseDown(config, dispatch), [
        config.component, config.isContainer, config.sourceContainer
    ])

    return {
        onMouseDown: startDrag,
        onTouchStart: startDrag
    }
}

export default useStartDrag;

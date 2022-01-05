import { MouseEvent, TouchEvent, useCallback } from "react";
import pauseEvent from "../pause-event";
import useDispatch from "../use-dispatch";

interface UseHandleConfig {
    component: string;
    isContainer?: boolean;
    sourceContainer?: string;
}

const handleMouseDown = (config: UseHandleConfig, dispatch: Function) => (e: MouseEvent | TouchEvent) => {
    pauseEvent(e);
    dispatch({
        type: 'DRAG_START',
        ...config
    });
}

const useHandle = (config: UseHandleConfig) => {
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

export default useHandle;
import { MouseEvent, TouchEvent, useCallback } from 'react';
import pauseEvent from '../pause-event';
import { AnyObject } from '../types';
import useDispatch from '../use-dispatch';

interface UseHandleConfig extends AnyObject {
    component: string;
    sourceContainer?: string;
    [key: string]: any;
}

const handleMouseDown = (config: UseHandleConfig, dispatch: (...args: any) => any) => (e: MouseEvent | TouchEvent) => {
	pauseEvent(e);
	dispatch({
		type: 'DRAG_START',
		...config
	});
};

const useHandle = (config: UseHandleConfig) => {
	const dispatch = useDispatch();

	const startDrag = useCallback(handleMouseDown(config, dispatch), [ ...Object.values(config) ]);

	return {
		onClick: pauseEvent,
		onMouseDown: startDrag,
		onTouchStart: startDrag
	};
};

export default useHandle;

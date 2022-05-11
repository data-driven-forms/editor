import { MouseEvent, TouchEvent } from 'react';

function pauseEvent(e: MouseEvent | TouchEvent) {
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault && e.type !== 'touchstart') e.preventDefault();
}

export default pauseEvent;

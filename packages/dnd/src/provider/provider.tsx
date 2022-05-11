import React from 'react';
import DropCursor from '../drop-cursor';

import dispatchContext from '../dispatch-context';
import stateContext from '../state-context';

export interface ProviderProps {
    dispatch: (...args: any) => any;
    state: any;
    DropCursorProps?: any;
}

const Provider: React.FC<ProviderProps> = ({ dispatch, state, children, DropCursorProps }) => <dispatchContext.Provider value={dispatch}>
	<stateContext.Provider value={state}>
		{state.draggingElement && <DropCursor {...DropCursorProps} />}
		{children}
	</stateContext.Provider>
</dispatchContext.Provider>;

export default Provider;

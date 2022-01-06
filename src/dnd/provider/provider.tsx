import React from 'react';
import DropCursor from '../drop-cursor';

import dispatchContext from "../dispatch-context"
import stateContext from "../state-context"

const Provider: React.FC<{ dispatch: Function, state: any, DropCursorProps?: any }> = ({ dispatch, state, children, DropCursorProps }) => <dispatchContext.Provider value={dispatch}>
    <stateContext.Provider value={state}>
        {state.draggingElement && <DropCursor {...DropCursorProps} />}
        {children}
    </stateContext.Provider>
</dispatchContext.Provider>;

export default Provider;
import { useReducer } from "react";

const reducer = (state: any, action: any) => {
    console.log(action.type, action, state)
    switch (action.type) {
        case 'DRAG_START':
            return {
                ...state,
                draggingElement: action.component
            };
        case 'DRAG_ABORT':
            return {
                ...state,
                draggingElement: null
            };
        case 'DRAG_DROP':
            return {
                ...state,
                draggingElement: null
            };
    }
}

function useBuilderState(): [any, any] {
    const [state, dispatch] = useReducer(reducer, null, () => {
        return {
            draggingElement: null,
            schema: {},
        };
    });

    return [state, dispatch];
}

export default useBuilderState;
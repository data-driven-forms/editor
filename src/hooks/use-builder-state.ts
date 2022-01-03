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
        case 'UPDATE_POSITION':
            return {
                ...state,
                containers: {
                    ...state.containers,
                    [action.id]: {
                        ...state.containers[action.id],
                        metadata: { ...action.metadata }
                    }
                }
            }
        case 'ADD_CONTAINER':
            return {
                ...state,
                containers: {
                    ...state.containers,
                    [action.id]: {
                        children: [],
                        ref: action.ref,
                        isStatic: action.isStatic
                    }
                }
            }
    }
}

function useBuilderState(): [any, any] {
    const [state, dispatch] = useReducer(reducer, null, () => {
        return {
            draggingElement: null,
            components: {},
            containers: {}
        };
    });

    return [state, dispatch];
}

export default useBuilderState;
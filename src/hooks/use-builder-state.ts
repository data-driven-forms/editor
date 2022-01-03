import { useReducer } from "react";

const reducer = (state: any, action: any) => {
    console.log(action.type, action, state)
    switch (action.type) {
        case 'DRAG_START':
            return {
                ...state,
                draggingElement: action.component,
                isDraggingContainer: action.isContainer,
            };
        case 'DRAG_DROP':
            const id = `${state.draggingElement}-${Date.now()}`;

            if (state.isDraggingContainer) {
                return {
                    ...state,
                    draggingElement: null,
                    isDraggingContainer: null,
                    ...(action.targetContainer && {
                        containers: {
                            ...state.containers,
                            [action.targetContainer]: {
                                ...state.containers[action.targetContainer],
                                children: [
                                    ...state.containers[action.targetContainer].children,
                                    id
                                ]
                            },
                            [id]: {
                                children: [],
                                ref: null,
                            }
                        },
                    })
                };
            }

            return {
                ...state,
                draggingElement: null,
                isDraggingContainer: null,
                ...(action.targetContainer && {
                    components: {
                        ...state.components,
                        [id]: {
                            component: state.draggingElement,
                            name: id
                        }
                    },
                    containers: {
                        ...state.containers,
                        [action.targetContainer]: {
                            ...state.containers[action.targetContainer],
                            children: [
                                ...state.containers[action.targetContainer].children,
                                id
                            ]
                        }
                    }
                })
            };
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
        case 'UPDATE_CONTAINER':
            return {
                ...state,
                containers: {
                    ...state.containers,
                    [action.id]: {
                        ...state.containers[action.id],
                        ref: action.ref,
                    }
                }
            }
        case 'UPDATE_COMPONENT':
            return {
                ...state,
                components: {
                    ...state.components,
                    [action.id]: {
                        ...state.components[action.id],
                        ref: action.ref,
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
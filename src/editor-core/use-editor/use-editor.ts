import { useReducer } from "react";
import { clearDrag } from "../../dnd/reducer";
import reducer from "../reducer";

function useEditor(): [any, any] {
    const [state, dispatch] = useReducer(reducer, null, () => {
        return {
            ...clearDrag,
            components: {},
            containers: {
                root: {
                    children: [],
                    ref: null
                }
            },
            selectedComponent: null,
            showSchema: false
        };
    });

    return [state, dispatch];
}

export default useEditor;

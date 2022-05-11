import { createRef, useEffect } from "react";
import useDispatch from "../use-dispatch";
import useState from "../use-state";
export interface UseComponentConfig {
    id: string;
}

const useComponent = ({ id }: UseComponentConfig) => {
    const state = useState();
    const dispatch = useDispatch();
    const ref = createRef<HTMLDivElement>();

    const component = state.components[id];

    useEffect(() => {
        if (ref.current) {
            dispatch({ type: 'UPDATE_COMPONENT', id, ref: ref.current })
        }
    }, [])

    return { ref, component };
}

export default useComponent;

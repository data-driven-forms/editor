import { createRef, useEffect } from "react";

interface UseComponentConfig {
    id: string;
    dispatch: Function;
}

const useComponent = ({id, dispatch}: UseComponentConfig) => {
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        if (ref.current) {
            dispatch({ type: 'UPDATE_COMPONENT', id, ref: ref.current })
        }
    }, [])

    return ref;
}

export default useComponent;

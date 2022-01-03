import { useCallback } from "react";
import useDispatch from "./hooks/use-dispatch";

function pauseEvent(e: MouseEvent | TouchEvent) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault && e.type !== 'touchstart') e.preventDefault();
    e.cancelBubble = true;
    return false;
}

const MenuItem = ({ component, label, isContainer }: any) => {
    const dispatch = useDispatch();

    const handleMouseDown = useCallback(
        (component, isContainer, e) => {
            pauseEvent(e);
            dispatch({
                type: 'DRAG_START',
                component,
                isContainer
            });
        },
        [],
    );

    return <div
        className="component"
        onMouseDown={(e) => handleMouseDown(component, isContainer, e)}
        onTouchStart={(e) => handleMouseDown(component, isContainer, e)}
    >
        {label}
    </div>
}

export default MenuItem;

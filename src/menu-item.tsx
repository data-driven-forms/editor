import { useCallback } from "react";

const MenuItem = ({ onDragStart, component, label, isContainer }: any) => {
    const handleMouseDown = useCallback(
        (componentInfo, isContainer) => (e: any) => {
            if (onDragStart) onDragStart(componentInfo, isContainer, e);
        },
        [onDragStart],
    );

    return <div
        className="component"
        onMouseDown={handleMouseDown(component, isContainer)}
        onTouchStart={handleMouseDown(component, isContainer)}
    >
        {label}
    </div>
}

export default MenuItem;

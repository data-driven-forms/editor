import { useCallback } from "react";

const Component = ({ onDragStart }: any) => {
    const handleMouseDown = useCallback(
        componentInfo => (e: any) => {
            if (onDragStart) onDragStart(componentInfo, e);
        },
        [onDragStart],
    );

    return <div
        className="component"
        onMouseDown={handleMouseDown('component')}
    >
        Component
    </div>
}

export default Component;

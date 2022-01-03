import React, { createRef, Fragment, useCallback, useEffect } from "react";

import useState from "./hooks/use-state";

const findTargetElement = (position: any, containers: any): any => {
    let result = null;

    Object.keys(containers).forEach(key => {
        const container = containers[key];

        const metadata = container.ref.getBoundingClientRect().toJSON();

        if (position.x >= metadata.x && position.x <= metadata.right
            && position.y >= metadata.y && position.y <= metadata.bottom
        ) {
            result = metadata
        }
    })

    return result;
}

const DropCursor = ({ onMouseUp }: any) => {
    const selectorRef = createRef<HTMLDivElement>();
    const mouseRef = createRef<HTMLDivElement>();

    const state = useState();

    const handleMouseMove = React.useCallback(
        (e: any) => {
            if (!selectorRef.current || !mouseRef.current) {
                return;
            }
            selectorRef.current.style.border = '';
            selectorRef.current.style.outline = '';

            const targetRect = findTargetElement({ x: e.x, y: e.y }, state.containers);

            console.log(targetRect)

            if (targetRect) {
                selectorRef.current.style.top = `${targetRect.top}px`;
                selectorRef.current.style.left = `${targetRect.left}px`;
                selectorRef.current.style.width = `${targetRect.width}px`;
                selectorRef.current.style.height = `${targetRect.height}px`;
                selectorRef.current.style.border = '3px solid #A40000';
            }

            mouseRef.current.style.left = `${e.x}px`;
            mouseRef.current.style.top = `${e.y}px`;
        },
        [],
    );

    const handleMouseUp = useCallback(
        (e: MouseEvent) => {
            if (!onMouseUp) return;

            e.preventDefault();
            e.stopPropagation();

            onMouseUp();
        },
        [],
    );

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    })

    return <Fragment>
        <div ref={selectorRef}
            style={{
                position: 'fixed',
                zIndex: 99999999,
                pointerEvents: 'none',
                userSelect: 'none',
                outlineOffset: '-1px',
            }}
        />
        <div
            ref={mouseRef}
            style={{
                left: -10,
                position: 'fixed',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: '2px solid red',
                margin: '-5px 0 0 -5px',
                zIndex: 99999999,
                pointerEvents: 'none',
                userSelect: 'none',
            }} />
    </Fragment>
}

export default DropCursor;
import React, { createRef, Fragment, useCallback, useEffect, useRef } from "react";

import findTargetElement from "../find-target-element";
import useDispatch from "../use-dispatch";
import useState from "../use-state";

const DropCursor: React.FC<{ CursorProps?: any }> = ({ CursorProps }) => {
    const selectorRef = createRef<HTMLDivElement>();
    const mouseRef = createRef<HTMLDivElement>();
    const targetContainer = useRef<any>();

    const state = useState();
    const dispatch = useDispatch();

    const handleMouseMove = React.useCallback(
        (e: any) => {
            if (!selectorRef.current || !mouseRef.current) {
                return;
            }
            selectorRef.current.style.border = '';
            selectorRef.current.style.outline = '';

            let cursorPosition = { x: e.x, y: e.y }
            if (e.type === 'touchmove') {
                cursorPosition = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                }
            }

            const { rect, container, position } = findTargetElement(cursorPosition, state);

            if (rect) {
                selectorRef.current.style.top = `${rect.top}px`;
                selectorRef.current.style.left = `${rect.left}px`;
                selectorRef.current.style.width = `${rect.width - 8}px`;
                selectorRef.current.style.height = `${rect.height}px`;
                selectorRef.current.style.border = '3px solid #A40000';
            }

            mouseRef.current.style.left = `${e.x}px`;
            mouseRef.current.style.top = `${e.y}px`;

            targetContainer.current = { targetContainer: container, position };
        },
        [],
    );

    const handleMouseUp = useCallback(
        (e: MouseEvent | TouchEvent) => {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();

            dispatch({
                type: 'DRAG_DROP',
                ...targetContainer.current
            });
        },
        [],
    );

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        document.addEventListener('touchmove', handleMouseMove);
        document.addEventListener('touchend', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
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
                transition: 'top 0.2s, left 0.2s, height 0.2s, width 0.2s'
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
            }}
            {...CursorProps}
        />
    </Fragment>
}

export default DropCursor;
import React, { createRef, Fragment, useCallback, useEffect, useRef } from "react";
import useDispatch from "./hooks/use-dispatch";

import useState from "./hooks/use-state";

const findTargetElement = (position: any, state: any): any => {
    let result = null;
    let resultContainer = null;
    let resultPosition;

    // find most suitable container
    Object.keys(state.containers).forEach(key => {
        let temporaryResult = null;

        const container = state.containers[key];

        const metadata = container.ref.getBoundingClientRect().toJSON();

        // check if mouse is inside a container
        if (
            position.x >= metadata.x
            && position.x <= metadata.right
            && position.y >= metadata.y
            && position.y <= metadata.bottom
        ) {
            // check if users wants to move item under another item
            container.children.forEach((id: any, index: number) => {
                const component = state.components[id] || state.containers[id];
                const componentPosition = component.ref.getBoundingClientRect().toJSON();

                // if users points 5px under and half of the component
                // insert item under the component
                if (
                    Math.abs(componentPosition.bottom - position.y) < (componentPosition.height / 2) ||
                    Math.abs(position.y - componentPosition.bottom) < 5) {
                    temporaryResult = { ...componentPosition, top: componentPosition.bottom - 1, height: 2 };
                    resultPosition = index + 1;
                }
            })

            // user is pointing to the top of the container
            if (position.y - metadata.top < 10) {
                temporaryResult = { ...metadata, height: 2 }
                resultPosition = 0;
            }

            // push to the bottom
            result = temporaryResult || metadata;
            resultContainer = key;
        }
    })

    return { rect: result, container: resultContainer, position: resultPosition };
}

const DropCursor = () => {
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

            console.log(rect)

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
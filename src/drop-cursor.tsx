import React, { createRef, Fragment, useEffect } from "react";

const DropCursor = () => {
    const selectorRef = createRef<HTMLDivElement>();
    const mouseRef = createRef<HTMLDivElement>();

    const handleMouseMove = React.useCallback(
        e => {
            if (!selectorRef.current || !mouseRef.current) {
                return;
            }
            selectorRef.current.style.border = '';
            selectorRef.current.style.outline = '';

            //const targetRect = targetElement.getBoundingClientRect();

            mouseRef.current.style.left = `${e.x}px`;
            mouseRef.current.style.top = `${e.y}px`;

            //selectorRef.current.style.top = `${targetRect.top}px`;
            //selectorRef.current.style.left = `${targetRect.left}px`;
            //selectorRef.current.style.width = `${targetRect.width}px`;
            //selectorRef.current.style.height = `${targetRect.height}px`;
        },
        [],
    );

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);

        return () => document.removeEventListener('mousemove', handleMouseMove);
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
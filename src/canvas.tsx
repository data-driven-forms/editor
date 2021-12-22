import React, { useCallback, useEffect } from "react";

const Canvas = ({ onMouseUp }: any) => {
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
        document.addEventListener('mouseup', handleMouseUp);

        return () => document.removeEventListener('mouseup', handleMouseUp);
    })

    return <div className='canvas'>
        <div style={{width: 100, height:100, margin: 5, background: 'black'}} />
        <div style={{width: 100, height:100, margin: 5, background: 'white'}} />
        <div style={{width: 100, height:100, margin: 5, background: 'yellow'}} />
        <div style={{width: 100, height:100, margin: 5, background: 'green'}} />
    </div>
}

export default Canvas;

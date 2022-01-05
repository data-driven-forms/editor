import React from 'react';

import useHandle from "../../dnd/use-handle";

const MenuItem: React.FC<{component: string, isContainer?: boolean}> = ({ component, children, isContainer, ...props }) => {
    const events = useHandle({ component, isContainer });

    return <div {...props} {...events}>
        {children}
    </div>
}

export default MenuItem;

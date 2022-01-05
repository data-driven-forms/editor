import React from 'react';

import useHandle from "../../dnd/use-handle";

export interface MenuItemProps extends React.HTMLProps<HTMLDivElement> {
    component: string;
    isContainer?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ component, children, isContainer, ...props }) => {
    const events = useHandle({ component, isContainer });

    return <div {...props} {...events}>
        {children}
    </div>
}

export default MenuItem;

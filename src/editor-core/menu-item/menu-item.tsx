import React from 'react';

import useHandle from "../../dnd/use-handle";

export interface MenuItemProps extends React.HTMLProps<HTMLDivElement> {
    component: string;
    isContainer?: boolean;
    Component?: string | React.FC;
}

const MenuItem: React.FC<MenuItemProps> = ({ component, children, isContainer, Component = 'div', ...props }) => {
    const events = useHandle({ component, isContainer });

    return <Component {...props} {...events}>
        {children}
    </Component>
}

export default MenuItem;

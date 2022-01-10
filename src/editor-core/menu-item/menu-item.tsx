import React from 'react';
import { AnyObject } from '../../dnd/types';

import useHandle from "../../dnd/use-handle";

export interface MenuItemProps extends React.HTMLProps<HTMLDivElement> {
    component: string;
    isContainer?: boolean;
    Component?: string | React.FC;
    componentInitialProps?: AnyObject;
}

const MenuItem: React.FC<MenuItemProps> = ({ component, children, isContainer, Component = 'div', componentInitialProps, ...props }) => {
    const events = useHandle({ component, isContainer, props: componentInitialProps });

    return <Component {...props} {...events}>
        {children}
    </Component>
}

export default MenuItem;

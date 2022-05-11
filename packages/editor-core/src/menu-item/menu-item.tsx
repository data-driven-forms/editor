import React from 'react';

import useHandle from '@data-driven-forms/dnd/use-handle';
import { AnyObject } from '../types';

export interface MenuItemProps extends React.HTMLProps<HTMLDivElement> {
    component: string;
    Component?: string | React.FC;
    componentInitialProps?: AnyObject;
}

const MenuItem: React.FC<MenuItemProps> = ({ component, children, Component = 'div', componentInitialProps, ...props }) => {
	const events = useHandle({ component, props: componentInitialProps });

	return <Component {...props} {...events}>
		{children}
	</Component>;
};

export default MenuItem;

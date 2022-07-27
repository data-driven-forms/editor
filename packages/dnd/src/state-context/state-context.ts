import { createContext } from 'react';
import { AnyObject } from '../types';

export interface Component extends AnyObject {
    ref?: Element;
}

export interface Container extends AnyObject {
    ref?: Element;
    children: string[];
}

export interface Components {
    [key: string]: Component;
}

export interface Containers {
    [key: string]: Container;
}

export interface StateContext extends AnyObject {
    components: Components;
    containers: Containers;
    draggingElement?: string | null,
    isDraggingContainer?: boolean | null,
    draggingSourceContainer?: string | null,
}

const context = createContext<StateContext>({
	components: {},
	containers: {
		root: {
			children: []
		}
	},
	draggingElement: null,
	isDraggingContainer: null,
	draggingSourceContainer: null,
});

export default context;

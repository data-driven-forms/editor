import React from 'react';

import Provider from '@data-driven-forms/dnd/provider';
import { ProviderProps } from '@data-driven-forms/dnd';

import { AnyObject } from '../types';

import useEditor from '../use-editor';
import { Schema } from '@data-driven-forms/react-form-renderer';

export interface EditorProps extends AnyObject, Partial<ProviderProps> { initialSchema?: Schema; };

const Editor: React.FC<EditorProps> = ({ children, initialSchema, ...props }) => {
	const [state, dispatch] = useEditor({ initialSchema });

	return (
		<Provider dispatch={dispatch} state={state} {...props}>
			{children}
		</Provider>
	);
};

export default Editor;

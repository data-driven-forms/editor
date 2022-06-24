import { useReducer } from 'react';
import { clearDrag } from '@data-driven-forms/dnd/reducer';
import { Schema } from '@data-driven-forms/react-form-renderer';

import reducer from '../reducer';
import convertSchema from '../convert-schema';

export interface UseEditorProps {
	initialSchema?: Schema;
}

function useEditor(props?: UseEditorProps): [any, any] {
	const [state, dispatch] = useReducer(reducer, null, () => {
		const { containers, components } = convertSchema(props?.initialSchema);

		return {
			...clearDrag,
			components,
			containers,
			selectedComponent: null,
			showSchema: false,
			mode: 'build'
		};
	});

	return [state, dispatch];
}

export default useEditor;

import React from 'react';
import { Pane, Heading, CrossIcon } from 'evergreen-ui';

import useState from '@data-driven-forms/dnd/use-state';
import useDispatch from '@data-driven-forms/dnd/use-dispatch';
import convertToSchema from '@data-driven-forms/editor-core/convert-to-schema';
import { AnyObject } from '../types';

const Code: React.FC = () => {
	const state: AnyObject = useState();
	const dispatch = useDispatch();

	if (!state.showSchema) {
		return null;
	}

	return <Pane padding="8" elevation={0} marginX={4}>
		<Pane display="flex" marginBottom="8px">
			<Heading size={500} flex="1">Schema</Heading>
			<CrossIcon cursor="pointer" onClick={() => dispatch({ type: 'TOGGLE_SCHEMA' })} />
		</Pane>
		<Pane maxHeight="400px" overflowY="auto">
			<pre>
				{JSON.stringify(convertToSchema(state), null, 2)}
			</pre>
		</Pane>
	</Pane>;
};

export default Code;

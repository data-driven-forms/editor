import React from 'react';
import { Pane, Heading, CrossIcon } from 'evergreen-ui';

import useState from './dnd/use-state';
import useDispatch from './dnd/use-dispatch';
import convertToSchema from './convert-to-schema';

const Code: React.FC = () => {
    const state = useState()
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
    </Pane>
}

export default Code;
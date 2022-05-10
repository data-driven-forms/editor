import React from 'react';
import { Pane, Heading, Paragraph, CrossIcon, Button } from 'evergreen-ui';

import useEditorState from './dnd/use-state';
import Properties from './editor-core/properties';
import useDispatch from './dnd/use-dispatch';
import { Field } from '@data-driven-forms/react-form-renderer';
import propertiesComponentMapper from './properties-component-mapper';

interface PropertiesCardProps {
    fields: Field[];
}

const PropertiesCard: React.FC<PropertiesCardProps> = ({ fields }) => {
    const state = useEditorState()
    const dispatch = useDispatch();

    if (!state.selectedComponent) {
        return null;
    }

    return <Pane position="sticky" top="40px" maxHeight="calc(100vh - 40px)" display="flex" flexDirection="column">
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
            <Pane padding={16} borderBottom="muted">
                <Pane display="flex">
                    <Pane flex="1">
                        <Heading size={600}>
                            {state.selectedComponent}
                        </Heading>
                    </Pane>
                    <CrossIcon cursor="pointer" onClick={() => dispatch({ type: 'UNSELECT_COMPONENT' })} />
                </Pane>
                <Paragraph size={400} color="muted">
                    Edit field properties.
                </Paragraph>
            </Pane>
            <Pane display="flex">
                <Button flex="1" margin="8px" intent="danger" onClick={() => dispatch({ type: 'REMOVE_COMPONENT', id: state.selectedComponent })}>
                    Remove
                </Button>
            </Pane>
        </Pane>
        <Properties
            componentMapper={propertiesComponentMapper}
            fields={fields}
        />
    </Pane>
}

export default PropertiesCard;

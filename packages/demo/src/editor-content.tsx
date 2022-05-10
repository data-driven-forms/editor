import React from 'react';
import useState from './dnd/use-state';

import { Pane } from 'evergreen-ui';

import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import { componentMapper } from '@data-driven-forms/mui-component-mapper';
import { Field, Schema } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import convertToSchema from './editor-core/convert-to-schema';
import FormCard from './form-card';

export interface EditorContentProps {
    fields: Field[];
}

const EditorContent: React.FC<EditorContentProps> = ({ fields }) => {
    const state = useState()

    if (state.mode === 'test') {
        return <FormRenderer
            schema={convertToSchema(state) as Schema}
            onSubmit={() => undefined}
            componentMapper={componentMapper}
            FormTemplate={(props) =>
                <React.Fragment>
                    <Pane flex="1" display="flex" paddingLeft={8} paddingTop={8} paddingRight={8} flexDirection="column" elevation={4} zIndex={1}>
                        <FormTemplate {...props} />
                    </Pane>
                    <FormCard />
                </React.Fragment>
            }
        />;
    }

    return null;
}

export default EditorContent;
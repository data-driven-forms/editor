import React from 'react';
import useState from '@data-driven-forms/dnd/use-state';

import { Pane } from 'evergreen-ui';

import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import { Field, Schema, FormTemplateRenderProps, ComponentMapper } from '@data-driven-forms/react-form-renderer';
import convertToSchema from '@data-driven-forms/editor-core/convert-to-schema';
import FormCard from './form-card';
import { AnyObject } from '../types';

export interface EditorContentProps {
    fields: Field[];
	FormTemplate: React.ComponentType<FormTemplateRenderProps>;
	componentMapper: ComponentMapper;
}

const EditorContent: React.FC<EditorContentProps> = ({ fields, FormTemplate, componentMapper }) => {
	const state: AnyObject = useState();

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
};

export default EditorContent;

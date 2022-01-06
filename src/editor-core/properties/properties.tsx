import React from 'react';

import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer/common-types';

import useState from '../../dnd/use-state';
import { AnyObject } from '../../dnd/types';

const FormTemplate: React.FC<FormTemplateRenderProps> = ({ schema, formFields }) => {
    const { handleSubmit } = useFormApi();

    return (
        <form onSubmit={handleSubmit}>
            {formFields}
        </form>
    )
}

interface PropertiesProps {
    componentMapper: AnyObject;
}

const Properties: React.FC<PropertiesProps> = ({ componentMapper }) => {
    const state = useState();

    const selectedComponent = state.components[state.selectedComponent] || state.containers[state.selectedComponent];

    if (!selectedComponent) {
        return <span>No selected component</span>;
    }

    return <FormRenderer
        initialValues={selectedComponent}
        schema={{
            fields: [
                {
                    name: 'component',
                    component: 'select',
                    label: 'Component',
                    description: 'Component type.',
                    isRequired: true,
                    validate: [{ type: 'required' }],
                    options: [
                        { label: 'Text field', value: 'text-field' },
                        { label: 'Select', value: 'select' },
                        { label: 'Form group', value: 'form-group' },
                    ]
                },
                {
                    name: 'name',
                    component: 'text-field',
                    label: 'Name',
                    description: 'Name of the field. You can use dot notation to nest variables.',
                    isRequired: true,
                    validate: [{ type: 'required' }]
                }
            ]
        }}
        onSubmit={console.log}
        debug={console.log}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
    />;
}

export default Properties;

import React from 'react';

import omit from 'lodash/omit';

import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import FormSpy from '@data-driven-forms/react-form-renderer/form-spy';
import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer/common-types';
import { Field } from '@data-driven-forms/react-form-renderer';

import useState from '../../dnd/use-state';
import { AnyObject } from '../../dnd/types';
import useDispatch from '../../dnd/use-dispatch';

const FormTemplate: React.FC<FormTemplateRenderProps> = ({ schema, formFields }) => {
    const { handleSubmit } = useFormApi();

    return (
        <form onSubmit={handleSubmit}>
            {formFields}
        </form>
    )
}

const EditorFormSpy: React.FC<{ onChange: (values: AnyObject) => void }> = ({ onChange }) => <FormSpy
    subscription={{ values: true }}
    onChange={(props: any) => onChange(props.values)}
/>

interface PropertiesProps {
    componentMapper: AnyObject;
    fields?: Field[];
}

const Properties: React.FC<PropertiesProps> = ({ componentMapper, fields = [] }) => {
    const state = useState();
    const dispatch = useDispatch();

    const selectedComponent = state.components[state.selectedComponent] || state.containers[state.selectedComponent];

    if (!selectedComponent) {
        return <span>No selected component</span>;
    }

    return <FormRenderer
        initialValues={omit(selectedComponent, ['ref'])}
        schema={{
            fields: [
                {
                    component: 'editor-form-spy', name: 'editor-form-spy', onChange: (values: AnyObject) => dispatch({
                        type: 'UPDATE_PROPS',
                        id: state.selectedComponent,
                        props: values
                    })
                },
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
                },
                ...fields
            ]
        }}
        onSubmit={console.log}
        FormTemplate={FormTemplate}
        componentMapper={{
            'editor-form-spy': EditorFormSpy,
            ...componentMapper
        }}
    />;
}

export default Properties;

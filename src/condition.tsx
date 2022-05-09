import React from 'react';

import { FormRenderer, FormSpy, useFormApi } from "@data-driven-forms/react-form-renderer";
import useFieldApi, { UseFieldApiProps } from "@data-driven-forms/react-form-renderer/use-field-api";
import { AnyObject } from "./dnd/types";
import { isEqual } from 'lodash';

export interface ConditionProps extends UseFieldApiProps<string> {
    name: string;
    componentMapper: AnyObject;
    isRoot?: boolean;
};


const Condition: React.FC<ConditionProps> = (props) => {
    const { input, componentMapper, isRoot } = useFieldApi(props);
    const { getState } = useFormApi()

    const options = [
        { value: 'and', label: 'And' },
        { value: 'or', label: 'Or' },
        { value: 'single', label: 'Single condition' },
    ];

    if (isRoot) {
        options.push({ value: 'sequence', label: 'Sequence' })
    }

    const FormTemplate = React.useCallback(({ formFields }) => <React.Fragment>
        {formFields}
        <FormSpy
            subscription={{ values: true, dirty: true }}
            onChange={({ values, dirty }) => {
                if (dirty) {
                    const value: AnyObject = {};

                    if (values.type === 'single') {
                        value.when = values.when.length === 1 ? values.when[0] : values.when;
                    } else {
                        value[values.type] = values.values;

                        if (Array.isArray(value[values.type])) {
                            value[values.type] = value[values.type].map((condition: any) => condition?.condition ? condition.condition : condition);
                        }
                    }

                    if (value && !isEqual(value, getState().values[props.name])) {
                        input.onChange(value)
                    }
                }
            }}
        />
    </React.Fragment>, [])

    const componentMapperFinal = React.useMemo(() => ({
        ...componentMapper,
        'condition': (props: ConditionProps) => <Condition {...props} isRoot={false} componentMapper={componentMapper} />
    }), [])

    const initialValues = React.useMemo(() => {
        let values: AnyObject = {};

        if (Object.prototype.hasOwnProperty.call(input.value, 'sequence')) {
            values.type = 'sequence';
            values.values = input.value.sequence.map((x: any) => ({ condition: x }))
        } else if (Object.prototype.hasOwnProperty.call(input.value, 'and')) {
            values.type = 'and';
            values.values = input.value.and.map((x: any) => ({ condition: x }))
        } else if (Object.prototype.hasOwnProperty.call(input.value, 'or')) {
            values.type = 'or';
            values.values = input.value.or.map((x: any) => ({ condition: x }))
        } else {
            values.type = 'single';
            values.when = Array.isArray(input.value.when) ? input.value.when : [input.value.when];
        }

        return values;
    }, [getState().values.name])

    return <div>
        <FormRenderer
            key={getState().values.name}
            onSubmit={console.log}
            initialValues={initialValues}
            schema={{
                fields: [
                    {
                        component: 'select',
                        name: 'type',
                        label: 'type',
                        options
                    },
                    {
                        component: 'field-array',
                        name: 'values',
                        condition: {
                            when: 'type',
                            is: ['sequence', 'and', 'or']
                        },
                        fields: [{
                            component: 'condition',
                            name: 'condition',
                        }],
                        clearOnUnmount: true,
                    },
                    {
                        component: 'sub-form',
                        name: 'single-form',
                        condition: {
                            when: 'type',
                            is: 'single',
                        },
                        fields: [
                            {
                                component: 'field-array',
                                label: 'when',
                                name: 'when',
                                fields: [{
                                    component: 'text-field'
                                }]
                            }
                        ]
                    }
                ]
            }}
            componentMapper={componentMapperFinal}
            FormTemplate={FormTemplate}
        />
    </div>
}

export default Condition;
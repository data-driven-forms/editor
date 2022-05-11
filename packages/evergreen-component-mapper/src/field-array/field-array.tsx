import React, { MouseEventHandler } from 'react';
import { AnyObject, Field, useFieldApi, UseFieldApiProps, useFormApi } from '@data-driven-forms/react-form-renderer';
import { Button, FormField, Pane } from 'evergreen-ui';
import FieldArrayProvider from '@data-driven-forms/react-form-renderer/field-array';

interface FieldArrayItemProps {
    name: string;
    remove: Function;
    fields: Field[];
    length: number;
    minItems: number;
};

const FieldArrayItem: React.FC<FieldArrayItemProps> = ({ name, fields, length, minItems, remove }) => {
    const { renderForm } = useFormApi();

    const editedFields = fields.map((field, index) => {
        const computedName = field.name ? `${name}.${field.name}` : name;
        return { ...field, name: computedName, key: `${name}-${index}` };
    });

    const isRemoveDisabled = length <= minItems;

    return <Pane display="flex" flexDirection="column" border marginBottom={4} padding={4}>
        {editedFields.map((field) => renderForm([field]))}
        <Button
            size="small"
            disabled={isRemoveDisabled}
            onClick={remove as MouseEventHandler}
            marginTop={4}
            alignSelf="flex-end"
        >
            Remove
        </Button>
    </Pane>;
}

export interface FieldArrayProps extends UseFieldApiProps<any> {
    name: string;
    defaultItem?: (value: any) => AnyObject;
}

const FieldArray: React.FC<FieldArrayProps> = (props) => {
    const { input, meta, arrayValidator, fields, defaultItem, maxItems, minItems, ...rest } = useFieldApi(props)

    return <div>
        <FieldArrayProvider key={input.name} input={input} meta={meta} name={input.name} validate={arrayValidator}>
            {({ fields: { map, value = [], push, remove } }: any) => (
                <Pane display="flex" flexDirection="column">
                    <Pane display="flex" >
                        <FormField flex="1" {...rest}>
                        </FormField>
                        <Button
                            size="small"
                            disabled={value.length >= maxItems}
                            {...(!(value.length >= maxItems) && { onClick: () => push(typeof defaultItem === 'function' ? defaultItem(value) : defaultItem) })}
                        >
                            Add
                        </Button>
                    </Pane>
                    {value.length === 0 && <Pane textAlign="center">
                        ---
                    </Pane>}
                    {map((name: string, index: number) => <FieldArrayItem
                        name={name}
                        remove={() => remove(index)}
                        fields={fields}
                        length={value.length}
                        minItems={minItems}
                    />)}
                </Pane>
            )}
        </FieldArrayProvider>
    </div>
}

export default FieldArray;

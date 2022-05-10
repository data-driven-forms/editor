import React from 'react';

import { SelectField } from 'evergreen-ui';

import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { AnyObject, UseFieldApiProps } from '@data-driven-forms/react-form-renderer';

export interface SelectOption extends AnyObject {
    value?: any;
    label: React.ReactNode;
}

export interface SelectProps extends UseFieldApiProps<string> {
    name: string;
    isRequired?: boolean;
    options: SelectOption[];
};

const Select: React.FC<SelectProps> = (props) => {
    const { input, meta, isDisabled, options, isRequired, ...rest } = useFieldApi(props);

    return (
        <SelectField
            {...input}
            isInvalid={Boolean(meta.error)}
            validationMessage={meta.error}
            disabled={isDisabled}
            required={isRequired}
            {...rest}
        >
            {options &&
                options.map((option: SelectOption) => (
                    <option key={option.value || option.label} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </option>
                ))}
        </SelectField>
    );
};

export default Select;
import React from 'react';

import { TextInputField } from 'evergreen-ui';

import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { UseFieldApiProps } from '@data-driven-forms/react-form-renderer';

interface TextFieldProps extends UseFieldApiProps<string> {
    name: string;
    isRequired?: boolean;
};

const TextField: React.FC<TextFieldProps> = (props) => {
    const { input, meta, isRequired, ...rest } = useFieldApi(props);

    return <TextInputField
        {...input}
        required={isRequired}
        isInvalid={Boolean(meta.error)}
        validationMessage={meta.error}
        {...rest}
    />;
};

export default TextField;
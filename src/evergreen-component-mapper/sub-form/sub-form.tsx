import React from 'react';

import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import { Field } from '@data-driven-forms/react-form-renderer';

interface SubFormProps {
    fields: Field[];
};

const SubForm: React.FC<SubFormProps> = ({fields, ...props}) => {
    const { renderForm } = useFormApi();

    return (
        <div {...props}>
            {renderForm(fields)}
        </div>
    );
};

export default SubForm;

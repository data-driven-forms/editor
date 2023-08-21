import React from 'react';

import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import { Field, useFieldApi, UseFieldApiProps } from '@data-driven-forms/react-form-renderer';

export interface SubFormProps extends UseFieldApiProps<any> {
    name: string;
    fields?: Field[];
};

const SubForm: React.FC<SubFormProps> = (props) => {
	const { renderForm } = useFormApi();
	const { fields = [] } = useFieldApi(props);

	return <div {...props}>{renderForm(fields)}</div>;
};

export default SubForm;

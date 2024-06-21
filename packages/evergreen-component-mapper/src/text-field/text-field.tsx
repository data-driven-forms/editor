import React from 'react';

import { Autocomplete, TextInputField } from 'evergreen-ui';

import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { UseFieldApiProps } from '@data-driven-forms/react-form-renderer';

export interface TextFieldProps extends UseFieldApiProps<string> {
	name: string;
	items: string[];
	isRequired?: boolean;
}

const TextField: React.FC<TextFieldProps> = (props) => {
	const { input, meta, isRequired, items, ...rest } = useFieldApi(props);

	return (
		<Autocomplete {...input} items={items} {...rest}>
			{({ getInputProps, getRef, inputValue, openMenu }) => (
				<TextInputField
					ref={getRef}
					required={isRequired}
					isInvalid={Boolean(meta.error)}
					validationMessage={meta.error}
					{...getInputProps({ onFocus: () => openMenu() })}
					value={inputValue}
				/>
			)}
		</Autocomplete>
	);
};

export default TextField;

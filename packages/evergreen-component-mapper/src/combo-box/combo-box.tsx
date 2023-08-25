import React, { useMemo } from 'react';

import { Combobox as EvergreenCombobox, ComboboxProps as EvergreenComboboxProps, FormField, FormFieldProps } from 'evergreen-ui';

import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { AnyObject, UseFieldApiProps } from '@data-driven-forms/react-form-renderer';

export interface ComboBoxItem extends AnyObject {
  value?: any;
  label: string;
}

export interface ComboBoxProps
  extends UseFieldApiProps<string>,
    Omit<EvergreenComboboxProps, 'selectedItem' | 'onChange' | 'disabled' | 'items' | 'itemToString'>,
    Pick<FormFieldProps, 'label' | 'description'> {
  name: string;
  isRequired?: boolean;
  options: ComboBoxItem[];
}

const ComboBox: React.FC<ComboBoxProps> = (props) => {
	const { id,
		input,
		meta,
		isDisabled,
		options,
		isRequired,
		label,
		description,
		inputProps,
		...rest
	} = useFieldApi(props) as ComboBoxProps;

	const selectedItem = useMemo(() => {
		return options.find((item: ComboBoxItem) => item.value === input.value) ?? null;
	}, [input.value, options]);

	return (
		<FormField
			labelFor={id}
			label={label}
			description={description}
			isRequired={isRequired}
			validationMessage={meta.error}
			marginBottom={24}
		>
			<EvergreenCombobox
				id={id}
				width="100%"
				selectedItem={selectedItem}
				onChange={(item?: ComboBoxItem) => input.onChange(item?.value)}
				disabled={isDisabled}
				items={options}
				itemToString={(item?: ComboBoxItem) => (item ? item.label : '')}
				inputProps={{
					required: isRequired,
					isInvalid: Boolean(meta.error),
					...inputProps,
				}}
				{...rest}
			/>
		</FormField>
	);
};

export default ComboBox;

import React from 'react';

import { FormRenderer, FormSpy, useFormApi } from '@data-driven-forms/react-form-renderer';
import useFieldApi, { UseFieldApiProps } from '@data-driven-forms/react-form-renderer/use-field-api';
import isEqual from 'lodash/isEqual';
import { AnyObject } from '../types';

export interface ConditionProps extends UseFieldApiProps<string> {
    name: string;
    componentMapper: AnyObject;
    isRoot?: boolean;
};


const Condition: React.FC<ConditionProps> = (props) => {
	const { input, componentMapper, isRoot } = useFieldApi(props);
	const { getState } = useFormApi();

	const options = [
		{ value: 'and', label: 'And' },
		{ value: 'or', label: 'Or' },
		{ value: 'single', label: 'Single condition' },
		{ value: 'not', label: 'Not' },
		{ value: 'none', label: 'None' },
	];

	if (isRoot) {
		options.push({ value: 'sequence', label: 'Sequence' });
	}

	const FormTemplate = React.useCallback(({ formFields }) => <React.Fragment>
		{formFields}
		<FormSpy
			subscription={{ values: true, dirty: true }}
			onChange={({ values, dirty }) => {
				if (dirty) {
					const value: AnyObject = {};

					if (values.type === 'single') {
						value.when = values.when?.length === 1 ? values.when[0] : values.when;
						value[values.condition_type] = values.value;
					} else {
						value[values.type] = values.values;

						if (Array.isArray(value[values.type])) {
							value[values.type] = value[values.type].map((condition: any) => condition?.condition ? condition.condition : condition);
						}
					}

					if (value && !isEqual(value, getState().values[props.name])) {
						input.onChange(value);
					}
				}
			}}
		/>
	</React.Fragment>, []);

	const componentMapperFinal = React.useMemo(() => ({
		...componentMapper,
		'condition': (props: ConditionProps) => <Condition {...props} isRoot={false} componentMapper={componentMapper} />
	}), []);

	const initialValues = React.useMemo(() => {
		const values: AnyObject = {};

		if (Object.prototype.hasOwnProperty.call(input.value, 'sequence')) {
			values.type = 'sequence';
			values.values = input.value.sequence.map((x: any) => ({ condition: x }));
		} else if (Object.prototype.hasOwnProperty.call(input.value, 'and')) {
			values.type = 'and';
			values.values = input.value.and.map((x: any) => ({ condition: x }));
		} else if (Object.prototype.hasOwnProperty.call(input.value, 'or')) {
			values.type = 'or';
			values.values = input.value.or.map((x: any) => ({ condition: x }));
		} else if (Object.prototype.hasOwnProperty.call(input.value, 'not')) {
			values.type = 'not';
			values.values = input.value.not.map((x: any) => ({ condition: x }));
		} else if (Object.prototype.hasOwnProperty.call(input.value, 'when')){
			values.type = 'single';
			values.when = Array.isArray(input.value.when) ? input.value.when : [input.value.when];

			['is', 'pattern', 'isEmpty', 'isNotEmpty', 'greaterThan', 'greaterThanOrEqualTo', 'lessThan', 'lessThanOrEqualTo', 'x',].forEach((atr) => {
				if (Object.prototype.hasOwnProperty.call(input.value, atr)) {
					values.condition_type = atr;
					values.value = input.value[atr];
				}
			});
		}

		return values;
	}, [getState().values.name]);

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
						options,
						initialValue: 'none'
					},
					{
						component: 'field-array',
						name: 'values',
						condition: {
							when: 'type',
							is: ['sequence', 'and', 'or', 'not']
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
									component: 'text-field',
									label: 'Name'
								}],
								clearOnUnmount: true,
							},
							{
								component: 'select',
								name: 'condition_type',
								label: 'Condition',
								clearOnUnmount: true,
								initialValue: 'is',
								options: [
									{ label: 'is', value: 'is' },
									{ label: 'pattern', value: 'pattern' },
									{ label: 'isEmpty', value: 'isEmpty' },
									{ label: 'isNotEmpty', value: 'isNotEmpty' },
									{ label: 'greaterThan', value: 'greaterThan' },
									{ label: 'greaterThanOrEqualTo', value: 'greaterThanOrEqualTo' },
									{ label: 'lessThan', value: 'lessThan' },
									{ label: 'lessThanOrEqualTo', value: 'lessThanOrEqualTo' },
								]
							},
							{
								component: 'text-field',
								label: 'value',
								name: 'value',
								clearOnUnmount: true,
								condition: {
									when: 'condition_type',
									is: ['is', 'pattern', 'greaterThan', 'greaterThanOrEqualTo', 'lessThan', 'lessThanOrEqualTo']
								}
							},
							{
								component: 'checkbox',
								label: 'Value',
								name: 'value',
								key: 'value1',
								initialValue: true,
								clearOnUnmount: true,
								condition: {
									when: 'condition_type',
									is: ['isEmpty', 'isNotEmpty']
								}
							},
						]
					}
				]
			}}
			componentMapper={componentMapperFinal}
			FormTemplate={FormTemplate}
		/>
	</div>;
};

export default Condition;

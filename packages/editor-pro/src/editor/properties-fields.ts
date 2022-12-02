import { Field, FieldApi, ComponentMapper } from '@data-driven-forms/react-form-renderer';
import { AnyObject } from '../types';

export interface PropertiesFieldsInput {
    componentMapper: ComponentMapper;
}

const fieldProps = ({componentMapper}: PropertiesFieldsInput) => ([
	{
		name: 'component',
		component: 'select',
		label: 'Component',
		description: 'Component type.',
		isRequired: true,
		validate: [{ type: 'required' }],
		options: Object.keys(componentMapper).map(key => ({
			label: key.replaceAll('-', ' '),
			value: key
		}))
	},
	{
		name: 'name',
		component: 'text-field',
		label: 'Name',
		description: 'Name of the field. You can use dot notation to nest variables.',
		isRequired: true,
		validate: [{ type: 'required' }]
	},
	{
		name: 'text-field-group',
		component: 'sub-form',
		condition: { when: 'component', is: ['text-field', 'textarea', 'checkbox', 'select', 'radio', 'switch', 'dual-list-select', 'field-array'] },
		fields: [
			{ component: 'text-field', name: 'label', label: 'Label', description: 'Label of the field.' },
			{ component: 'text-field', name: 'description', label: 'Description', description: 'Description of the field.' },
			{ component: 'text-field', name: 'helperText', label: 'Helper text' },
			{ component: 'checkbox', name: 'isRequired', label: 'Is required?' },
			{ component: 'checkbox', name: 'isDisabled', label: 'Is disabled?' },
			{ component: 'checkbox', name: 'isReadOnly', label: 'Is read-only?' },
		],
	},
	{
		name: 'sub-form-group',
		component: 'sub-form',
		condition: { when: 'component', is: ['sub-form'] },
		fields: [
			{ component: 'text-field', name: 'title', label: 'Title', description: 'Title of the sub-form.' },
			{ component: 'text-field', name: 'description', label: 'Description', description: 'Description of the sub-form.' },
		],
	},
	{
		name: 'options-group',
		component: 'sub-form',
		condition: { when: 'component', is: ['select', 'radio', 'checkbox', 'field-array', 'dual-list-select'] },
		fields: [
			{
				component: 'field-array', name: 'options', label: 'Options', description: 'Available options.', defaultItem: () => ({ value: `value-${Date.now()}`, label: 'label' }), fields: [
					{
						label: 'Label',
						name: 'label',
						component: 'text-field',
						marginBottom: '4px',
					},
					{
						label: 'Value',
						name: 'value',
						component: 'text-field',
						marginBottom: '2px',
					}
				]
			},
		],
	},
	{
		name: 'name-plain-text-group',
		component: 'sub-form',
		condition: { when: 'component', is: ['plain-text'] },
		fields: [
			{ component: 'text-field', name: 'label', label: 'Label', description: 'Label of the field.' }
		]
	},
	{
		name: 'custom-props',
		component: 'plain-text',
		content: 'Components also accept custom props. Check documentation for you components/mapper to read more.',
		maxWidth: '320px',
		size: 300,
	}
]);

const validatorFields = () => ([
	{
		label: 'Use warnings',
		name: 'useWarnings',
		component: 'checkbox',
		marginBottom: '4px',
		description: 'Enable to use warnings - validators, that do not prevent to submit the form.'
	},
	{
		component: 'field-array', name: 'validate', label: 'Validators', description: 'Available validators.', defaultItem: {}, fields: [
			{
				label: 'Type',
				name: 'type',
				component: 'select',
				marginBottom: '4px',
				validate: [{ type: 'required' }],
				options: [
					{ label: 'None' },
					{ label: 'Required', value: 'required' },
					{ label: 'Min length', value: 'min-length' },
					{ label: 'Max length', value: 'max-length' },
					{ label: 'Exact length', value: 'exact-length' },
					{ label: 'Min number value', value: 'min-number-value' },
					{ label: 'Max number value', value: 'max-number-value' },
					{ label: 'Pattern', value: 'pattern' },
					{ label: 'URL', value: 'url' },
				],
				resolveProps: (props: AnyObject, { meta }: FieldApi<any>) => {
					if (meta.dirty) {
						props.options[0].disabled = true;

						return { options: props.options };
					}

					return {};
				}
			},
			{
				label: 'Threshold',
				name: 'threshold',
				component: 'text-field',
				marginBottom: '2px',
				condition: {
					when: (field: Field) => `${field.name.replace('threshold', 'type')}`,
					is: [
						'min-length',
						'max-length',
						'exact-length',
					]
				},
				validate: [{ type: 'required' }],
				clearOnUnmount: true,
			},
			{
				label: 'Value',
				name: 'value',
				component: 'text-field',
				marginBottom: '2px',
				condition: {
					when: (field: Field) => `${field.name.replace('value', 'type')}`,
					is: [
						'min-number-value',
						'max-number-value',
					]
				},
				clearOnUnmount: true,
				validate: [{ type: 'required' }],
			},
			{
				label: 'Include threshold',
				name: 'includeThreshold',
				component: 'checkbox',
				marginBottom: '2px',
				condition: {
					when: (field: Field) => `${field.name.replace('includeThreshold', 'type')}`,
					is: [
						'min-number-value',
						'max-number-value',
					]
				},
				clearOnUnmount: true,
			},
			{
				label: 'Pattern',
				name: 'pattern',
				component: 'text-field',
				marginBottom: '2px',
				condition: {
					when: (field: Field) => `${field.name.replace('pattern', 'type')}`,
					is: 'pattern'
				},
				clearOnUnmount: true,
				validate: [{ type: 'required' }],
			},
			{
				label: 'Flags',
				name: 'flags',
				component: 'text-field',
				marginBottom: '2px',
				condition: {
					when: (field: Field) => `${field.name.replace('flags', 'type')}`,
					is: 'pattern'
				},
				clearOnUnmount: true,
			},
			{
				label: 'Message',
				name: 'message',
				component: 'text-field',
				marginBottom: '2px',
			},
			{
				label: 'Is warning?',
				name: 'warning',
				component: 'checkbox',
				marginBottom: '2px',
				clearOnUnmount: true,
				condition: {
					when: 'useWarnings',
					is: true
				}
			}
		]
	},
	{
		component: 'link',
		name: 'link1',
		label: 'Overwriting default messages',
		href: 'https://data-driven-forms.org/schema/overwriting-default-message',
		description: 'Default messages can be globally overwritten.',
		isFirst: true,
	},
	{
		component: 'link',
		name: 'link2',
		label: 'Validator mapper',
		href: 'https://data-driven-forms.org/mappers/validator-mapper',
		description: 'A custom set of validators can be passed.'
	},
	{
		component: 'link',
		name: 'link4',
		label: 'Custom validators',
		href: 'https://data-driven-forms.org/schema/custom-validator',
		description: 'A custom function can be passed as a validator.'
	},
	{
		component: 'link',
		name: 'link3',
		label: 'Async validators',
		href: 'https://data-driven-forms.org/schema/async-validator',
		description: 'A custom async function can be passed as a validator.'
	},
]);

const conditionFields = () => ([
	{
		component: 'condition',
		name: 'condition'
	},
	{
		component: 'link',
		name: 'link',
		label: 'Conditional actions',
		href: 'https://data-driven-forms.org/schema/condition-actions',
		description: 'Condition can be used to set form values.',
		isFirst: true,
	},
]);

const fieldPropsFields = () => ([
	{
		label: 'Initial value',
		name: 'initialValue',
		component: 'text-field',
		marginBottom: '2px',
	},
	{
		label: 'Initialize on mount',
		name: 'initializeOnMount',
		component: 'checkbox',
	},
	{
		label: 'Clear on unmount',
		name: 'clearOnUnmount',
		component: 'checkbox',
	},
	{
		label: 'Cleared value',
		name: 'clearedValue',
		component: 'text-field',
		marginTop: '2px',
		marginBottom: '2px',
	},
	{
		label: 'Hide field',
		name: 'hideField',
		component: 'checkbox',
	},
	{
		label: 'Data type',
		name: 'dataType',
		component: 'select',
		marginTop: '2px',
		marginBottom: '4px',
		options: [
			{ label: 'None', value: '' },
			{ label: 'integer', value: 'integer' },
			{ label: 'float', value: 'float' },
			{ label: 'number', value: 'number' },
			{ label: 'boolean', value: 'boolean' },
			{ label: 'string', value: 'string' },
		],
	},
	{
		component: 'link',
		name: 'link1',
		label: 'resolveProps',
		href: 'https://data-driven-forms.org/schema/resolve-props',
		description: 'A custom function that resolves props at run-time.',
		isFirst: true,
	},
	{
		component: 'link',
		name: 'link2',
		label: 'actionMapper',
		href: 'https://data-driven-forms.org/mappers/action-mapper',
		description: 'A custom mapper allowing to map schema props to functions.'
	},
	{
		component: 'link',
		name: 'link3',
		label: 'fieldProps',
		href: 'https://data-driven-forms.org/schema/introduction#heading-fieldprops',
		description: 'A Final Form field configuration.'
	},
]);

const propertiesFields = ({ componentMapper }: PropertiesFieldsInput) => [
	{
		name: 'tabs', component: 'tabs', fields: [
			{
				name: 'props-tab', title: 'Props', fields: fieldProps({ componentMapper })
			},
			{
				name: 'validators-tabs', title: 'Validators', fields: validatorFields()
			},
			{
				name: 'condition-tabs', title: 'Condition', fields: conditionFields()
			},
			{
				name: 'field-props', title: 'FieldProps', fields: fieldPropsFields()
			}
		]
	}
];

export default propertiesFields;

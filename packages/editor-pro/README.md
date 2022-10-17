- [Data Driven Forms Editor Pro](#data-driven-forms-editor-pro)
- [Props](#props)
  - [fields](#fields)
  - [componentMapper](#componentmapper)
  - [componentInitialProps](#componentinitialprops)
  - [initialSchema](#initialschema)

# Data Driven Forms Editor Pro

Data Driven Forms Editor is editor to build complex Data Driven Forms.

# Props

## fields

A schema of the properties editor. You can use our predefined helper functions to create subsections. Check [`public/index.tsx`](./public/index.tsx) for an example

```tsx
const fields: Schema = 	{
    fields: [{
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
	}, {
		name: 'name',
		component: 'text-field',
		label: 'Name',
		description: 'Name of the field. You can use dot notation to nest variables.',
		isRequired: true,
		validate: [{ type: 'required' }]
	}]
}
```

## componentMapper

A mapper of components you want to be able to edit.

**Example**

```tsx
import { componentMapper } from '@data-driven-forms/mui-component-mapper';
```

## FormTemplate

A FormTemplate to use in the preview box.

**Example**

```tsx
import { MuiFormTemplate } from '@data-driven-forms/mui-component-mapper';
```

## componentInitialProps

An object to set initial props for components. For example, some components required props to be initialized.

**Example**

```tsx
const componentInitialProps: AnyObject = {
	'dual-list-select': {
		options: []
	},
	'sub-form': {
		title: 'Sub form',
		fields: []
	},
	'field-array': {
		fields: []
	},
	wizard: {
		fields: [{ name: 'step-1', fields: [] }]
	},
	tabs: {
		fields: []
	}
};
```

## initialSchema

Initial schema to be put in the editor.

**Example**

```tsx
const initialSchema: Schema = {
	fields: [{
		component: componentTypes.TEXT_FIELD,
		name: 'name',
		label: 'Your name',
		isRequired: true,
		validate: [{ type: validatorTypes.REQUIRED }]
	  }, {
		component: componentTypes.TEXT_FIELD,
		name: 'email',
		label: 'Email',
		isRequired: true,
		validate: [
		  { type: validatorTypes.REQUIRED },
		  {
				type: validatorTypes.PATTERN,
				pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
				message: 'Not valid email'
		  }
		]
	  },{
		component: componentTypes.TEXT_FIELD,
		name: 'confirm-email',
		label: 'Confirm email',
		type: 'email',
		isRequired: true,
	  },{
		component: componentTypes.CHECKBOX,
		name: 'newsletters',
		label: 'I want to receive newsletter'
	  }, {
		  component: componentTypes.SUB_FORM,
		  name: 'subform1',
		  title: 'Additional info',
		  fields: [
			  {
				component: componentTypes.TEXTAREA,
				name: 'address',
				label: 'Your address',
			  }
		  ]
	  }
	]
};
```

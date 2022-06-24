import React from 'react';
import ReactDOM from 'react-dom';

import { componentMapper } from '@data-driven-forms/mui-component-mapper';

import Editor from '../src/editor';
import propertiesFields from '../src/editor/properties-fields';

import { AnyObject } from '../src/types';
import { componentTypes, Schema, validatorTypes } from '@data-driven-forms/react-form-renderer';

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

const fields = propertiesFields({ componentMapper });

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

const App = () => <Editor fields={fields} componentMapper={componentMapper} componentInitialProps={componentInitialProps} initialSchema={initialSchema} />;

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

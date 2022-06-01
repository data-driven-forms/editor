import React from 'react';
import ReactDOM from 'react-dom';

import { componentMapper } from '@data-driven-forms/mui-component-mapper';

import Editor from '../src/editor';
import propertiesFields from '../src/editor/properties-fields';

import { AnyObject } from '../src/types';

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

const App = () => <Editor fields={fields} componentMapper={componentMapper} componentInitialProps={componentInitialProps} />;

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

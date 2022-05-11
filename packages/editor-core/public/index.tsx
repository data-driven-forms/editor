import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import React from 'react';
import ReactDOM from 'react-dom';

import componentMapper from '../src/component-mapper';

const App = () => <FormRenderer
	schema={{
		fields: [{
			component: 'text-field',
			name: 'name',
			label: 'first-name'
		}]
	}}
	componentMapper={componentMapper}
	onSubmit={console.log}
	FormTemplate={({ formFields }) => <div>{formFields}</div>}
/>;

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

import React from 'react';

import { componentMapper } from '@data-driven-forms/mui-component-mapper';

import Editor from '../../src/editor';
import propertiesFields from '../../src/editor/properties-fields';

import { AnyObject } from '../../src/types';

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

describe('ProEditor', () => {
	it('can drag a new component', () => {
		cy.mount(<Editor fields={fields} componentMapper={componentMapper} componentInitialProps={componentInitialProps} />);
		cy.contains('text field').drag('.[style="display: flex; border: 1px dotted rgba(71, 77, 102, 0.5); min-height: 150px; background-color: rgb(249, 250, 252); padding: 4px; margin-left: 4px; flex-grow: 1; margin-right: 4px;"] > div');
	});
});

import React from 'react';

import { componentMapper } from '@data-driven-forms/mui-component-mapper';

import Editor from '../../src/editor';
import propertiesFields from '../../src/editor/properties-fields';

import { AnyObject } from '../../src/types';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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

const Wrapper = (props) => (
	<LocalizationProvider dateAdapter={AdapterDateFns}>
		<Editor {...props} />
	</LocalizationProvider>
);

describe('ProEditor', () => {
	it('can drag a new component', () => {
		cy.mount(<Wrapper fields={fields} componentMapper={componentMapper} componentInitialProps={componentInitialProps} />);

		cy.get('[data-cy="text-field"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'center');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'center');

		cy.get('[data-cy*="component-text-field"]').should('be.visible');
	});

	it('can open properties editor', () => {
		cy.mount(<Wrapper fields={fields} componentMapper={componentMapper} componentInitialProps={componentInitialProps} />);

		cy.get('[data-cy="text-field"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'center');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'center');

		cy.get('[data-cy*="component-text-field"]').click();

		cy.contains('Edit field properties.').should('be.visible');
	});

	it('can drag multiple components', () => {
		cy.mount(<Wrapper fields={fields} componentMapper={componentMapper} componentInitialProps={componentInitialProps} />);

		cy.get('[data-cy="text-field"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'center');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'center');

		cy.get('[data-cy="checkbox"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'center');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'center');


		cy.get('[data-cy*="component-text-field"]').should('be.visible');
		cy.get('[data-cy*="component-checkbox"]').should('be.visible');
	});

	it('can drag component to top', () => {
		cy.mount(<Wrapper fields={fields} componentMapper={componentMapper} componentInitialProps={componentInitialProps} />);

		cy.get('[data-cy="text-field"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'center');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'center');

		cy.get('[data-cy="checkbox"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'top');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'top');


		cy.get('[data-cy*="component-text-field"]').then($el => {
			const textfieldPosition = $el[0].getBoundingClientRect();
			cy.get('[data-cy*="component-checkbox"]').then($el => {
				const checkboxPosition = $el[0].getBoundingClientRect();

				assert(textfieldPosition.top > checkboxPosition.top, 'checkbox is on the top');
			});
		});
	});

	it('move components', () => {
		cy.mount(<Wrapper fields={fields} componentMapper={componentMapper} componentInitialProps={componentInitialProps} />);

		cy.get('[data-cy="text-field"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'center');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'center');

		cy.get('[data-cy="checkbox"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'center');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'center');

		cy.get('[data-cy*="component-checkbox"] [data-cy="handle"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'top');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'top');

		cy.get('[data-cy*="component-text-field"]').then($el => {
			const textfieldPosition = $el[0].getBoundingClientRect();
			cy.get('[data-cy*="component-checkbox"]').then($el => {
				const checkboxPosition = $el[0].getBoundingClientRect();

				assert(textfieldPosition.top > checkboxPosition.top, 'checkbox is on the top');
			});
		});
	});

	it('move into nested component', () => {
		cy.mount(<Wrapper fields={fields} componentMapper={componentMapper} componentInitialProps={componentInitialProps} />);

		cy.get('[data-cy="sub-form"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'center');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'center');

		cy.get('[data-cy="checkbox"]').trigger('mousedown');
		cy.get('[data-cy*="container-sub-form"]').trigger('mousemove', 'center');
		cy.get('[data-cy*="container-sub-form"]').trigger('mouseup', 'center');

		cy.get('[data-cy*="container-sub-form"] [data-cy*="component-checkbox"]').should('be.visible');
	});

	it('move nested into nested component', () => {
		cy.mount(<Wrapper fields={fields} componentMapper={componentMapper} componentInitialProps={componentInitialProps} />);

		cy.get('[data-cy="sub-form"]').trigger('mousedown');
		cy.get('[data-cy="container-root"]').trigger('mousemove', 'center');
		cy.get('[data-cy="container-root"]').trigger('mouseup', 'center');

		cy.get('[data-cy="sub-form"]').trigger('mousedown');
		cy.get('[data-cy*="container-sub-form"]').trigger('mousemove', 'center');
		cy.get('[data-cy*="container-sub-form"]').trigger('mouseup', 'center');

		cy.get('[data-cy*="container-sub-form"] [data-cy*="container-sub-form"]').should('be.visible');

		cy.get('[data-cy="checkbox"]').trigger('mousedown');
		cy.get('[data-cy*="container-sub-form"] [data-cy*="container-sub-form"]').trigger('mousemove', 'center');
		cy.get('[data-cy*="container-sub-form"] [data-cy*="container-sub-form"]').trigger('mouseup', 'center');

		cy.get('[data-cy*="container-sub-form"] [data-cy*="container-sub-form"] [data-cy*="component-checkbox"]').should('be.visible');
	});
});

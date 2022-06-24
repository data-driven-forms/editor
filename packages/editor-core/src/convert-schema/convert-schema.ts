import { Field, Schema } from '@data-driven-forms/react-form-renderer';
import { AnyObject } from '../types';

export const convertSchemaComponent = (fields: Field[] | Field, components: AnyObject, containers: AnyObject, container: string) => {
	if(Array.isArray(fields)) {
		fields.forEach((field: Field) => convertSchemaComponent(field, components, containers, container));
	} else {
		containers[container].children.push(fields.name);
		components[fields.name] = fields;

		if(fields.component === 'sub-form') {
			if(!containers[fields.name]) {
				containers[fields.name] = {
					children: []
				};
			}
			fields.fields.forEach((subField: Field) => convertSchemaComponent(subField, components, containers, fields.name));
		}
	}
};

const convertSchema = (schema?: Schema) => {
	const components = {};
	const containers = {
		root: {
			children: [],
			ref: null
		}
	};

	if(schema) {
		convertSchemaComponent(schema.fields, components, containers, 'root');
	}

	return { components, containers };
};

export default convertSchema;

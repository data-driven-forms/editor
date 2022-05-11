import React from 'react';

import Condition, { ConditionProps } from './condition';
import componentMapper from '@data-driven-forms/evergreen-component-mapper/component-mapper';

const propertiesComponentMapper = ({
	...componentMapper,
	'condition': (props: ConditionProps) => <Condition {...props} isRoot componentMapper={componentMapper} />
});

export default propertiesComponentMapper;

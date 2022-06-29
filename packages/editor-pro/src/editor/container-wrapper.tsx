import React from 'react';

import { DragHandleVerticalIcon } from 'evergreen-ui';

import Container, { ContainerProps } from '@data-driven-forms/editor-core/container';

const ContainerWrapper: React.FC<ContainerProps> = (props) => {
	return <Container
		{...props}
		HandleProps={{
			style: { marginLeft: 'auto' },
			size: 24,
			cursor: 'grab'
		}}
		Handle={DragHandleVerticalIcon}
		ListProps={{
			style: { minWidth: 'calc(100% - 24px)' }
		}}
		style={{
			display: 'flex',
			border: '1px dotted rgb(71 77 102 / 50%)',
			minHeight: 150,
			backgroundColor: '#f9fafc',
			padding: 4,
			marginLeft: 4,
			flexGrow: 1,
			marginRight: 4,
		}}
		data-cy={`container-${props.isRoot ? 'root' : props.id}`}
	/>;
};

export default ContainerWrapper;

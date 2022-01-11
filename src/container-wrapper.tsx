import React from 'react';

import { DragHandleVerticalIcon } from 'evergreen-ui';

import Container, { ContainerProps } from './editor-core/container';

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
        className='canvas'
        style={{ display: 'flex', border: '2px dotted rgb(71 77 102 / 50%)' }}
    />
}

export default ContainerWrapper;

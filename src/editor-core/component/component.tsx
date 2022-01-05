import React, { useCallback } from 'react';
import useComponent from '../../dnd/use-component';
import useDispatch from '../../dnd/use-dispatch';
import useHandle from '../../dnd/use-handle';

export interface ComponentProps extends React.HTMLProps<HTMLDivElement> {
    id: string;
    container: string;
    HandleProps?: React.HTMLProps<HTMLDivElement>;
    Handle?: string | React.FC;
}

const Component: React.FC<ComponentProps> = ({ id, container, HandleProps, Handle = 'div', ...props }) => {
    const dispatch = useDispatch();

    const events = useHandle({ component: id, sourceContainer: container });
    const { ref, component } = useComponent({ id });

    const onClick = useCallback(() => {
        dispatch({
            type: 'SELECT_COMPONENT',
            id
        })
    }, [id])

    return <div ref={ref} {...props} onClick={onClick}>
        <div>{component.name}</div>
        <Handle {...events} {...HandleProps} />
    </div>
}

export default Component;

import React from 'react';
import useComponent from '../../dnd/use-component';
import useHandle from '../../dnd/use-handle';

export interface ComponentProps extends React.HTMLProps<HTMLDivElement> {
    id: string;
    container: string;
    HandleProps?: React.HTMLProps<HTMLDivElement>;
}

const Component: React.FC<ComponentProps> = ({ id, container, HandleProps, ...props }) => {
    const events = useHandle({ component: id, sourceContainer: container });
    const { ref, component } = useComponent({ id });

    return <div ref={ref} {...props}>
        <div>{component.name}</div>
        <div
            {...events}
            {...HandleProps}
        >
            handle
        </div>
    </div>
}

export default Component;

import { Field } from '@data-driven-forms/react-form-renderer';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
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
    const formOptions = useFormApi()
    const { ref, component } = useComponent({ id });

    const onClick = useCallback(() => {
        dispatch({
            type: 'SELECT_COMPONENT',
            id
        })
    }, [id])

    const { ref: _ref, ...componentProps } = component;

    return <div ref={ref} {...props} onClick={onClick}>
        {formOptions.renderForm([componentProps as Field])}
        <Handle {...events} {...HandleProps} />
    </div>
}

export default Component;

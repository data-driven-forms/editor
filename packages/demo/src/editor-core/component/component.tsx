import { Field } from '@data-driven-forms/react-form-renderer';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import React, { useCallback, MouseEvent } from 'react';
import { AnyObject } from '../../dnd/types';
import useComponent from '../../dnd/use-component';
import useDispatch from '../../dnd/use-dispatch';
import useHandle from '../../dnd/use-handle';
import prepareCondition from '../prepare-condition';
import prepareValidate from '../prepare-validate';

export interface ComponentProps extends React.HTMLProps<HTMLDivElement> {
    id: string;
    container: string;
    HandleProps?: AnyObject;
    Handle?: string | React.FC<AnyObject>;
}

const Component: React.FC<ComponentProps> = ({ id, container, HandleProps, Handle = 'div', ...props }) => {
    const dispatch = useDispatch();

    const events = useHandle({ component: id, sourceContainer: container });
    const formOptions = useFormApi()
    const { ref, component } = useComponent({ id });

    const onClick = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type: 'SELECT_COMPONENT',
            id
        })
    }, [id])

    const { ref: _ref, ...componentProps } = component;

    if(componentProps.validate) {
        componentProps.validate = prepareValidate(componentProps.validate)
    }

    if(componentProps.condition) {
        componentProps.condition = prepareCondition(componentProps.condition)
    }

    return <div ref={ref} {...props} onClick={onClick}>
        {formOptions.renderForm([componentProps as Field])}
        <Handle {...events} {...HandleProps} />
    </div>
}

export default Component;

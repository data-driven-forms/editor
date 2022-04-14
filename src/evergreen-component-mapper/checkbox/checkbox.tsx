import React from 'react';
import { Checkbox as EvergreenCheckbox, FormFieldDescription } from 'evergreen-ui';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import MultipleChoiceListCommon from '@data-driven-forms/common/multiple-choice-list';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { AnyObject } from '../../dnd/types';

export interface CheckboxWrapperProps {
  label?: React.ReactNode;
  children: React.ReactChildren;
}

const Wrapper: React.FC<CheckboxWrapperProps> = ({ label, children }) => (
  <div>
    <h3>{label}</h3>
    {children}
  </div>
);

export interface SingleCheckboxProps extends UseFieldApiConfig {
}

const SingleCheckbox: React.FC<SingleCheckboxProps> = (props) => {
  const { input, meta: _meta, description, ...rest } = useFieldApi({ ...props, type: 'checkbox' });

  return (
    <React.Fragment>
      <EvergreenCheckbox {...input} {...rest} />
      {description && <FormFieldDescription paddingTop={2} maxWidth="320px">
        {description}
      </FormFieldDescription>}
    </React.Fragment>
  );
};

const SingleCheckboxInCommon: React.FC = (props) => <EvergreenCheckbox {...props} />;

export interface CheckboxProps extends AnyObject {
  name: string;
  options?: any;
}

const Checkbox: React.FC<CheckboxProps> = ({ options, ...props }) =>
  options ? (
    <MultipleChoiceListCommon options={options} {...props} Wrapper={Wrapper} Checkbox={SingleCheckboxInCommon} />
  ) : (
    <SingleCheckbox {...props} />
  );

export default Checkbox;
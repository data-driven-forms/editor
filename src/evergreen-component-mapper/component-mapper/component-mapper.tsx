import React from 'react';

import { componentTypes } from '@data-driven-forms/react-form-renderer';
import TextField from '../text-field';
import Select from '../select';
import SubForm from '../sub-form';

const NullComponent = () => <span>Not implemented</span>;

const mapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA]: NullComponent,
  [componentTypes.SELECT]: Select,
  [componentTypes.CHECKBOX]: NullComponent,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: NullComponent,
  [componentTypes.TABS]: NullComponent,
  [componentTypes.DATE_PICKER]: NullComponent,
  [componentTypes.TIME_PICKER]: NullComponent,
  [componentTypes.WIZARD]: NullComponent,
  [componentTypes.SWITCH]: NullComponent,
  [componentTypes.PLAIN_TEXT]: NullComponent,
  [componentTypes.FIELD_ARRAY]: NullComponent,
  [componentTypes.DUAL_LIST_SELECT]: NullComponent,
  [componentTypes.SLIDER]: NullComponent
};

export default mapper;

export const components = {
  TextField,
};

/* eslint-disable no-console */
import React from 'react';

import { FormikPureNumberField } from '@/core/Forms/FormikPureNumber';

import { FormikCheckbox } from './FormikCheckbox';
import { FormikFileUpload } from './FormikFileUpload';
import { FormikMultiSelect } from './FormikMultiSelect';
import { FormikRadioGroup } from './FormikRadioGroup';
import { FormikSelect } from './FormikSelect';
import { FormikTextField } from './FormikTextField';

type FieldType =
  | 'text'
  | 'number'
  | 'pure_number'
  | 'select'
  | 'multi-select'
  | 'checkbox'
  | 'radio'
  | 'file';

interface Props {
  id?: string;
  name: string;
  label?: string;
  type: FieldType;
  options?: { value: string | number; label: string }[];
  multiple?: boolean;
  allowDecimal?: boolean;
}

export const FormikField: React.FC<Props> = props => {
  const { type, options, ...rest } = props;

  switch (type) {
    case 'checkbox':
      if (!options) {
        console.warn('⚠️ FormikCheckbox requires options[]');
        return null;
      }
      return <FormikCheckbox {...rest} options={options} />;

    case 'multi-select':
      if (!options) {
        console.warn('⚠️ FormikMultiSelect requires options[]');
        return null;
      }
      return <FormikMultiSelect {...rest} options={options} multiple />;

    case 'radio':
      if (!options) {
        console.warn('⚠️ FormikRadioGroup requires options[]');
        return null;
      }
      return <FormikRadioGroup {...rest} options={options} />;

    case 'select':
      if (!options) {
        console.warn('⚠️ FormikSelect requires options[]');
        return null;
      }
      return <FormikSelect {...rest} options={options} />;

    case 'file':
      return <FormikFileUpload {...rest} multiple={props.multiple} />;

    case 'number':
      return <FormikTextField {...rest} type="number" />;

    case 'pure_number':
      return <FormikPureNumberField {...rest} />;

    case 'text':
    default:
      return <FormikTextField {...rest} type="text" />;
  }
};

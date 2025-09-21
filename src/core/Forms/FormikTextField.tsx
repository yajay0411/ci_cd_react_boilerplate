import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';
import React from 'react';

interface Props extends Omit<TextFieldProps, 'name'> {
  name: string;
}

export const FormikTextField: React.FC<Props> = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const error = meta.touched && meta.error ? meta.error : '';

  return (
    <TextField
      {...field}
      {...props}
      error={Boolean(error)}
      helperText={error || props.helperText}
      fullWidth
    />
  );
};

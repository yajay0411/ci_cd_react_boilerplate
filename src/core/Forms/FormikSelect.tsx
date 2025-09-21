import { TextField, MenuItem, type TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface Props extends Omit<TextFieldProps, 'name'> {
  name: string;
  options: { value: string | number; label: string }[];
}

export const FormikSelect: React.FC<Props> = ({ name, options, ...props }) => {
  const [field, meta] = useField(name);
  const error = meta.touched && meta.error ? meta.error : '';

  return (
    <TextField
      {...field}
      {...props}
      select
      error={Boolean(error)}
      helperText={error || props.helperText}
      fullWidth
    >
      {options.map(opt => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

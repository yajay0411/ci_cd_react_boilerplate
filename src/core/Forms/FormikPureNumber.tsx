import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface Props {
  name: string;
  label?: string;
  allowDecimal?: boolean; // optional flag
}

export const FormikPureNumberField: React.FC<Props> = ({ name, label, allowDecimal }) => {
  const [field, meta, helpers] = useField(name);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Block invalid keys
    if (['e', 'E', '+', '-'].includes(e.key) || (!allowDecimal && e.key === '.')) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow digits (and dot if decimal is allowed)
    const regex = allowDecimal ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/;

    if (regex.test(value)) {
      helpers.setValue(value);
    }
  };

  return (
    <TextField
      {...field}
      label={label}
      type="text" // keep text to have more control
      value={field.value || ''}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ''}
      fullWidth
    />
  );
};

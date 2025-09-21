import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface Props {
  name: string;
  label?: string; // optional
  options: { value: string | number; label: string }[];
}

export const FormikCheckbox: React.FC<Props> = ({ name, label, options }) => {
  const [field, meta, helpers] = useField<(string | number)[]>(name);

  const handleChange = (value: string | number) => {
    const current = field.value || [];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];

    helpers.setValue(newValue);
  };

  return (
    <FormControl component="fieldset" error={Boolean(meta.touched && meta.error)}>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup>
        {options.map(opt => (
          <FormControlLabel
            key={opt.value}
            control={
              <Checkbox
                checked={field.value?.includes(opt.value) || false}
                onChange={() => handleChange(opt.value)}
              />
            }
            label={opt.label}
          />
        ))}
      </FormGroup>
      {meta.touched && meta.error && (
        <div style={{ color: 'red', fontSize: '0.8rem' }}>{meta.error}</div>
      )}
    </FormControl>
  );
};

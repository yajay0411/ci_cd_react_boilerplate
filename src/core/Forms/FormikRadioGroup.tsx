import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface Props {
  name: string;
  label?: string; // <-- optional
  options: { value: string | number; label: string }[]; // <-- allow number also
}

export const FormikRadioGroup: React.FC<Props> = ({ name, label, options }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl component="fieldset" error={Boolean(meta.touched && meta.error)}>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup
        {...field}
        onChange={e => helpers.setValue(e.target.value)}
        value={field.value ?? ''}
      >
        {options.map(opt => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
      {meta.touched && meta.error && (
        <div style={{ color: 'red', fontSize: '0.8rem' }}>{meta.error}</div>
      )}
    </FormControl>
  );
};

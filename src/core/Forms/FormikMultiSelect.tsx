import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  type SelectChangeEvent,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';
import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  name: string;
  label?: string;
  options: Option[];
  multiple?: boolean;
}

export const FormikMultiSelect: React.FC<Props> = ({ name, label, options, multiple = true }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField<string | number | (string | number)[]>(name);

  const handleChange = (event: SelectChangeEvent<string | number | (string | number)[]>) => {
    const value = event.target.value;
    setFieldValue(name, value);
  };

  return (
    <FormControl fullWidth error={Boolean(meta.touched && meta.error)}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        {...field}
        multiple={multiple}
        onChange={handleChange}
        value={field.value || (multiple ? [] : '')}
        renderValue={selected =>
          multiple ? (selected as (string | number)[]).join(', ') : (selected as string | number)
        }
      >
        {options.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>
            {multiple && (
              <Checkbox checked={(field.value as (string | number)[]).includes(opt.value)} />
            )}
            <ListItemText primary={opt.label} />
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <div style={{ color: 'red', fontSize: '0.8rem' }}>{meta.error}</div>
      )}
    </FormControl>
  );
};

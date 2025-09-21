import { Button } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import React from 'react';

interface FormikFileUploadProps {
  name: string;
  label?: string;
  multiple?: boolean;
}

export const FormikFileUpload: React.FC<FormikFileUploadProps> = ({
  name,
  label,
  multiple = false,
}) => {
  const [, , helpers] = useField<File | File[] | null>(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = multiple ? Array.from(event.target.files) : event.target.files[0];
    setFieldValue(name, files);
    helpers.setTouched(true);
  };

  return (
    <Button variant="outlined" component="label">
      {label || (multiple ? 'Upload Files' : 'Upload File')}
      <input type="file" hidden multiple={multiple} onChange={handleChange} />
    </Button>
  );
};

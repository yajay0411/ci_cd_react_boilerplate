import { Button, Box, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { FormikField } from '@/core/Forms';

// ✅ Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  age: Yup.number().required('Required').min(18, 'Must be at least 18'),
  net_worth: Yup.number().required('Required'),
  gender: Yup.string().required('Required'),
  hobbies: Yup.array().of(Yup.string()).min(2, 'Select at least one hobby'),
  skills: Yup.array().of(Yup.string()).min(1, 'Select at least one skill'),
  country: Yup.string().required('Required'),
  resume: Yup.mixed().required('File is required'),
});

// ✅ Initial values
const initialValues = {
  firstName: '',
  age: '',
  net_worth: '',
  gender: '',
  hobbies: [] as string[],
  skills: [] as string[],
  country: '',
  resume: null as File | null,
};

const FormikPlayground: React.FC = () => {
  const handleSubmit = (values: typeof initialValues) => {
    // eslint-disable-next-line no-console
    console.log('Form Submitted ✅', values);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Formik Playground 🚀
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            {/* ✅ Text input */}
            <FormikField id="test" name="firstName" type="text" label="First Name" />

            {/* ✅ Number input */}
            <FormikField name="age" type="pure_number" label="Age" />

            {/* ✅ Net Worth input */}
            <FormikField name="net_worth" type="pure_number" label="Net Worth" allowDecimal />

            {/* ✅ Radio buttons */}
            <FormikField
              name="gender"
              type="radio"
              label="Gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />

            {/* ✅ Checkbox group */}
            <FormikField
              name="hobbies"
              type="checkbox"
              label="Hobbies"
              options={[
                { value: 'reading', label: 'Reading' },
                { value: 'music', label: 'Music' },
                { value: 'sports', label: 'Sports' },
              ]}
            />

            {/* ✅ MultiSelect */}
            <FormikField
              name="skills"
              type="multi-select"
              label="Skills"
              options={[
                { value: 'react', label: 'React' },
                { value: 'typescript', label: 'TypeScript' },
                { value: 'node', label: 'Node.js' },
              ]}
            />

            {/* ✅ Single Select */}
            <FormikField
              name="country"
              type="select"
              label="Country"
              options={[
                { value: 'india', label: 'India' },
                { value: 'usa', label: 'USA' },
                { value: 'germany', label: 'Germany' },
              ]}
            />

            {/* ✅ File Upload */}
            <FormikField name="resume" type="file" label="Upload Resume" />

            <Box mt={3}>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default FormikPlayground;

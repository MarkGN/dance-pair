import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

const initialValues = {
  name: '',
  description: '',
};

export default function MyForm() {
  const handleSubmit = (values, actions) => {
    axios.post('/events', values)
      .then(() => {
        actions.resetForm();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            {errors.name && touched.name && <div>{errors.name}</div>}
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field name="description" type="text" />
            {errors.description && touched.description && <div>{errors.description}</div>}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
// Possibly this can be emulated with formik-antd or formik-material-ui or something,
// but I can learn only so many libraries per project.

import { Field } from 'formik';
import React from "react";
import { useField } from 'formik';

export default function FormItem(props) {
  const [field, meta] = useField(props.name);
  return <div className="form-group">
    <Field {...field} {...props} />
    {/* <ErrorMessage name={props.name} /> */}
    {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
  </div>
}
// Possibly this can be emulated with formik-antd or formik-material-ui or something,
// but I can learn only so many libraries per project.

import { Field, useField } from "formik";
import React from "react";

export default function FormItem(props) {
  const [field, meta] = useField(props.name);
  return <div className="form-group">
    <Field {...field} {...props} />
    {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
  </div>
}
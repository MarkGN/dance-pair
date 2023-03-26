// Possibly this can be emulated with formik-antd or formik-material-ui or something,
// but I can learn only so many libraries per project.

import { ErrorMessage, Field } from 'formik';
import React from "react";

export default function FormItem(props) {
  return <div className="form-group">
    <Field name={props.name} placeholder={props.placeholder} type={props.type || "text"} />
    <ErrorMessage name={props.name} />
  </div>
}
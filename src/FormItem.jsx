// Possibly this can be emulated with formik-antd or formik-material-ui or something,
// but I can learn only so many libraries per project.

import { ErrorMessage, Field } from 'formik';
import React from "react";

export default function FormItem(props) {
  return <div>
    <label htmlFor={props.name}>{props.displayName || props.name}</label>
    <Field name={props.name} placeholder={props.name} type={props.type || "text"} />
    <ErrorMessage name={props.name} />
  </div>
}
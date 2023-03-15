import axios from 'axios';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import FormItem from "./FormItem";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  time: Yup.date().required("Required"),
  location: Yup.string().required("Required"),
  description: Yup.string().required('Required'),
});

const initialValues = {
  name: "event name",
  time: null,
  location: null,
  description: "event description",
};

/*
* name
* time
* location
* description
* ?endTime
* ?maxGuests
*/

// function MyField(name, args) {
//   return <div>
//     <label htmlFor={name}>{args.name || "Name*"}</label>
//     <Field name={name} type={args.type || "text"} />
//   {errors.name && touched.name && <div>{errors.name}</div>}
// </div>
// }

export default function NewEvent() {
  const url = "https://us-central1-dance-pair-server-42dc0.cloudfunctions.net/newEvent";
  const handleSubmit = (values, actions) => {
    console.log(values);
    const res = axios.post(url, values)
      .then(() => {
        console.log(res);
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
          <FormItem displayName="Name*" name="name" />
          <FormItem displayName="Time and date*" name="time" type="datetime-local" />
          <FormItem displayName="Location*" name="location" />
          <FormItem displayName="Description*" name="description" />
          {/* endTime */}
          <FormItem displayName="Maximum number of guests" name="maxNoGuests" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
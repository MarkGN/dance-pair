import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

const initialValues = {
  name: "event name",
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
  const url = "https://us-central1-dance-pair-server-42dc0.cloudfunctions.net/new";
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
        <div>
          <label htmlFor="name">Name*</label>
          <Field name="name" type="text" />
          {errors.name && touched.name && <div>{errors.name}</div>}
        </div>
          <div>
            <label htmlFor="time">Time*</label>
            <Field name="time" type="datetime-local" />
            {errors.time && touched.time && <div>{errors.time}</div>}
          </div>
          <div>
            <label htmlFor="location">Location*</label>
            <Field name="location" type="text" />
            {errors.location && touched.location && <div>{errors.location}</div>}
          </div>
          <div>
            <label htmlFor="description">Description*</label>
            <Field name="description" type="text" />
            {errors.description && touched.description && <div>{errors.description}</div>}
          </div>
          {/* <div>
            <label htmlFor="endTime">End time</label>
            <Field name="endTime" type="datetime-local" />
            {errors.endTime && touched.endTime && <div>{errors.endTime}</div>}
          </div> */}
          <div>
            <label htmlFor="maxGuests">Maximum number of guests</label>
            <Field name="maxGuests" type="number" />
            {errors.maxGuests && touched.maxGuests && <div>{errors.maxGuests}</div>}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
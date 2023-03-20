import axios from 'axios';
import React from 'react';
import { Formik, Form } from 'formik';
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
  time: new Date(),
  location: "",
  description: "event description",
  maxNoGuests: 10
};

/*
* name
* time
* location
* description
* ?endTime
* ?maxGuests
*/

/*
I have a react-router app. How do I make it such that when I press a button to submit a form, the button is disabled and users can't accidentally double-submit; and the user is redirected to a new page?
*/

export default function NewEvent() {
  let isSubmitting = false;
  const url = "https://us-central1-dance-pair-server-42dc0.cloudfunctions.net/newEvent";
  const handleSubmit = async (values, actions) => {
    console.log(actions)
    if (!isSubmitting) {
      isSubmitting = true;
      console.log(values);
      const res = await axios.post(url, values);  
      console.log(res);
      console.log("/event/"+res.data);
      // actions.resetForm();
      window.location.replace("/event/"+res.data);
    }
  
  };

  return (
    <div>

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
          <FormItem displayName="Maximum number of guests" name="maxNoGuests" type="number" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
    {/* <Formik onSubmit={(values, actions) => {
      redirect("/");
      return;
    }}>
        <Form>
          <button type="submit">Home</button>
        </Form>
    </Formik> */}
    </div>
  );
};
import axios from 'axios';
import { Formik, Form } from 'formik';
import FormItem from "./FormItem";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  time: Yup.date().required("Required"),
  location: Yup.string().required("Required"),
  description: Yup.string().required('Required'),
});

const now = new Date().toISOString();
const superfluousDatestringLength = 8; // The last 8 digits of seconds, milliseconds, and a trailing Z
const initialValues = {
  name: "",
  time: now.substring(0,now.length-superfluousDatestringLength),
  location: "",
  description: "",
  maxNoGuests: 10
};

export default function NewEvent() {
  const [isSubmitting, setSubmitting] = useState(false);
  const url = "https://us-central1-dance-pair-server-42dc0.cloudfunctions.net/newEvent";
  const navigate = useNavigate()

  const handleSubmit = async (values, actions) => {
    if (!isSubmitting) {
      setSubmitting(true);
      const res = await axios.post(url, values);
      navigate("/event/"+res.data)
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
            {/* <FormItem displayName="Maximum number of pairs" name="maxNoPairs" type="number" /> */}
            {isSubmitting ? 
            <p>Event submitted: please wait.</p> : 
            <button type="submit">Submit</button>}
            
          </Form>
        )}
      </Formik>
    </div>
  );
};
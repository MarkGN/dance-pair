import axios from 'axios';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import FormItem from "./FormItem";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email("Invalid email address").required('Required'),
  sex: Yup.string().required("Gender is required"),
});

const initialValues = {
  name: "name",
  email: "name@gmail.com",
  sex: ""
};

/*
* name
* time
* location
* description
* ?endTime
* ?maxGuests
*/

export default function Event() {
  const [eventData, setEventData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchEventData() {
      try {
        const url = "https://us-central1-dance-pair-server-42dc0.cloudfunctions.net/event";
        const response = await axios.post(url, {"id":id});
        setEventData(response.data);
      } catch (err) {
        setEventData({name: "Oh no! Error encountered: " + err, location: "The universe!", time: "For all eternity!", description: "Is doomed!"})
      }
    }
    fetchEventData();
  }, []);

  const postUrl = "https://us-central1-dance-pair-server-42dc0.cloudfunctions.net/register";
  const handleSubmit = (values, actions) => {
    values.id = id;
    console.log(values);
    const res = axios.post(postUrl, values)
      .then(() => {
        console.log(res);
        actions.resetForm();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <p>Event page</p>
      <p>{eventData ? String(eventData.name) : "Loading..."}</p>
      <p>{eventData ? String(eventData.location) : "Loading..."}</p>
      <p>{eventData ? String(eventData.time) : "Loading..."}</p>
      <p>{eventData ? String(eventData.description) : "Loading..."}</p>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <FormItem name="name" />
          <FormItem name="email" type="email" />
          <div>
            <label htmlFor="male">
              <Field id="male" type="radio" name="sex" value="male" />
              Male
            </label>
          </div>
          <div>
            <label htmlFor="female">
              <Field id="female" type="radio" name="sex" value="female" />
              Female
            </label>
          </div>
          <button type="submit">Submit</button>
          <ErrorMessage name="sex" />
        </Form>
      )}
    </Formik>
    </div>
    
  );
}
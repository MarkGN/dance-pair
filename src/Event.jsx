import axios from 'axios';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import FormItem from "./FormItem";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import LoadScreen from "./LoadScreen";

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email("Invalid email address").required('Required'),
  sex: Yup.string().required("Gender is required"),
});

const initialValues = {
  name: "",
  email: "",
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
  const [hasSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const url = "https://us-central1-dance-pair-server-42dc0.cloudfunctions.net/getEvent";
        const response = await axios.post(url, {"id":id});
        
        setEventData(response.data);
      } catch (err) {
        // setEventData({name: "Oh no! Error encountered: " + err, location: "The universe!", time: "For all eternity!", description: "Is doomed!"})
        setEventData({error:err});
      }
    }
    fetchEventData();
  });

  const postUrl = "https://us-central1-dance-pair-server-42dc0.cloudfunctions.net/register";
  const handleSubmit = async (values, actions) => {
    if (!hasSubmitted) {
      setSubmitted(true);
      values.id = id;
      const res = await axios.post(postUrl, values);
      console.log(res);
      setSubmitted(res.data);
    }
  };

  return (
    <div>
      {eventData ? <div>
        {eventData.error ? <Event404 /> : <div className="centred">
        <h1>Event page</h1>
        <p>{String(eventData.name)}</p>
        <p>{String(eventData.location)}</p>
        <p>{String(new Date(eventData.time).toLocaleString('en-GB'))}</p>
        <p>{String(eventData.description)}</p>
        {eventData.image ? <img src={eventData.image} alt="event" /> : <></>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched }) => (
          <Form>
            <FormItem name="name" placeholder="name*" />
            <FormItem name="email" placeholder="email*" type="email" />
            <div>
              <label htmlFor="male">
                Male
              </label>
              <Field id="male" type="radio" name="sex" value="male" />
            </div>
            <div>
              <label htmlFor="female">
                Female
              </label>
              <Field id="female" type="radio" name="sex" value="female" />
            </div>
            {hasSubmitted===true ? <div><p>Submitted, please wait</p></div> : !hasSubmitted && <div><button className="btn btn-primary" type="submit">Register</button></div>}
            <ErrorMessage name="sex" />
          </Form>
        )}
        </Formik>
      </div>}
      </div> : <LoadScreen />}
    <p>{{"registered" : "Successfully registered. We'll invite you as soon as we match you with a partner.", "invited": "You've been invited. Check your email!"}[hasSubmitted]}</p>
    </div>
  );
}

function Event404() {
  return <div className="centred">
    <h3>404: event not found.</h3>
    <h4>:O</h4>
  </div>
}
import axios from 'axios';
// import { Formik, Form, Field } from 'formik';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import * as Yup from 'yup';

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Required'),
//   description: Yup.string().required('Required'),
// });

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
        console.log(id);
        const response = await axios.post(url, {"id":id});
        console.log(response, response.data)
        setEventData(response.data);
      } catch (err) {
        setEventData({name: "Oh no! Error encountered: " + err, location: "The universe!", time: "For all eternity!", description: "Is doomed!"})
      }
    }
    fetchEventData();
  }, []);

  return (
    <div>
      <p>Event page</p>
      <p>{eventData ? String(eventData.name) : "Loading..."}</p>
      <p>{eventData ? String(eventData.location) : "Loading..."}</p>
      <p>{eventData ? String(eventData.time) : "Loading..."}</p>
      <p>{eventData ? String(eventData.description) : "Loading..."}</p>
    </div>
  );
}

// TODO add registration form
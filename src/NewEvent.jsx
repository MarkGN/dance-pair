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

// const now = new Date().toISOString();
let now = new Date(); 
const offset = now.getTimezoneOffset()*60000; 
now=new Date(now.getTime() - offset).toISOString();
const superfluousDatestringLength = 8; // The last 8 digits of seconds, milliseconds, and a trailing Z
const initialValues = {
  name: "",
  time: now.substring(0,now.length-superfluousDatestringLength),
  location: "",
  image: "",
  description: "",
  maxNoGuests: 10
};

function ImageFormItem(props) {
  const [imageUrl, setImageUrl] = React.useState("");
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
    props.onChange && props.onChange(event); // call the onChange prop if it exists
  };
  return (
    <div>
      <FormItem
        placeholder="Image URL"
        name={props.name}
        type="url"
        onChange={handleImageUrlChange}
        value={imageUrl}
      />
      {imageUrl && (
        <img src={imageUrl} alt="Preview" style={{ maxWidth: "100%" }} />
      )}
    </div>
  );
}

export default function NewEvent() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isError, setError] = useState(false);
  const url = "https://us-central1-dance-pair-server-42dc0.cloudfunctions.net/newEvent";
  const navigate = useNavigate()

  const handleSubmit = async (values, actions) => {
    if (!isSubmitting) {
      setSubmitting(true);
      console.log("Submitting: ", values);
      try {
        const res = await axios.post(url, values);
        console.log(res);
        navigate("/event/"+res.data)
      } catch (error) {
        setError(error);
        setSubmitting(false);
      }
    }  
  };

  return (
    <div className="centred">
      <h1>New event</h1>
      <p>Asterisked fields are required.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <FormItem placeholder="Event name*" name="name" />
            <FormItem placeholder="Time and date*" name="time" type="datetime-local" />
            <FormItem placeholder="Location*" name="location" />
            <ImageFormItem name="image" />
            <FormItem placeholder="Description*" name="description" as="textarea" />
            {isSubmitting ? 
            <p>Event submitted: please wait.</p> : 
            <button className="btn btn-primary" type="submit">Create event</button>}
            {isError ? <p>{JSON.stringify(isError)}</p> : <></>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

// function FormItem(props) {
//   const [val, setVal] = React.useState("");
//   const onChange = (event) => {
//     setVal(event.target.value);
//     props.onChange && props.onChange(event);
//   }
//   return <div className="form-group">
//     <Field name={props.name} onChange={onChange} placeholder={props.placeholder} type={props.type || "text"} value={val} />
//     <ErrorMessage name={props.name} />
//   </div>
// }
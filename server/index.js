const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const app = express();

// const admin = require('firebase-admin');

// // Initialize Firebase Admin SDK with appropriate credentials
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: 'dance-pair',
//     clientEmail: process.env.MY_EMAIL,
//     privateKey: require("./firebase-config.json"),
//   }),
//   databaseURL: process.env.DATABASE_URL
// });

var admin = require("firebase-admin");

var serviceAccount = require("./firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

// Handler for POST request to /events
app.post('/events', async (req, res) => {
  try {
    const eventData = req.body; // Assuming data is sent as JSON in the request body
    const db = admin.firestore();
    await db.collection('events').add(eventData); // Add the data to the 'events' collection in Firestore
    res.sendStatus(201); // Send a success status code
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Send an error status code
  }
});

app.get('/', async (req, res) => {
  res.send('Hello, World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
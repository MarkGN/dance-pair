import './App.css';
import { lazy, Suspense } from 'react'; // and Suspense
import React from 'react';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Event from './Event.jsx';
import HomePage from "./HomePage";
import LoadScreen from "./LoadScreen";
// import NewEvent from "./NewEvent";
import NotFound from "./NotFound";

const Event = lazy(() => import('./Event.jsx'));
const NewEvent = lazy(() => import('./NewEvent.jsx'));

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new" element={<Suspense fallback={<LoadScreen/>}><NewEvent /></Suspense>}/>
        <Route path="/event/:id" element={<Suspense fallback={<LoadScreen/>}><Event /></Suspense>}/>
        <Route exact path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
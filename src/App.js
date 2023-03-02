import './App.css';
import { lazy, Suspense } from 'react';

const EventDetailsPage = lazy(() => import('./EventDetailsPage.jsx'));

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new" element={<NewEventPage />}/>
        <Route path="/event/:eventId" element={({ match }) => <EventDetailsPage eventId={match.params.eventId} />}/>
        <Route exact path="/" element={<HomePage />}/>
      </Routes>
    </Router>
  );
}
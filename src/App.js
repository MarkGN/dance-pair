import './App.css';
import { lazy } from 'react'; // and Suspense

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./HomePage";

const EventDetailsPage = lazy(() => import('./EventDetailsPage.jsx'));

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/new" element={<NewEventPage />}/> */}
        <Route path="/event/:eventId" element={({ match }) => <EventDetailsPage eventId={match.params.eventId} />}/>
        <Route exact path="/" element={<HomePage />}/>
      </Routes>
    </Router>
  );
}
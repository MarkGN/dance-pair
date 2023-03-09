import './App.css';
import { lazy } from 'react'; // and Suspense

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./HomePage";

const Event = lazy(() => import('./Event.jsx'));
const NewEvent = lazy(() => import('./NewEvent.jsx'));

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new" element={<NewEvent />}/>
        <Route path="/event/:id" element={<Event />}/>
        <Route exact path="/" element={<HomePage />}/>
      </Routes>
    </Router>
  );
}
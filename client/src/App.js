import './App.css';
import * as React from 'react'
import Flights from '../src/components/Flights'
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import FlightCreationForm from './components/FlightCreationForm';
import ViewFlight from './components/ViewFlight';
import UpdateFlight from './components/UpdateFlight';
import UserProfile from './components/RegCustomer/userProfile';
import ReservationHistory from './components/RegCustomer/ReservationHistory';
import EditProfile from './components/RegCustomer/editProfile';
import ViewItinerary from './components/RegCustomer/viewItinerary';

function App() {
  return (
    <Router>
    <div className="App">
     <Routes>
      {/* <Route path="/" element={<Flights/>}/> */}
      <Route path="/" element={<UserProfile/>}/>
      <Route path="/newFlight" element={<FlightCreationForm/>}/>
      <Route path="/viewFlight/:id" element={<ViewFlight/>}/>
      <Route path="/updateFlight/:id" element={<UpdateFlight/>}/>
      <Route path="/profile/:id/" element={<UserProfile/>}/>
      <Route path="/profile/:id/reservations" element={<ReservationHistory/>}/>
      <Route path="/profile/:id/edit" element={<EditProfile/>}/>
      <Route path="/profile/:id/reservations/:booking" element={<ViewItinerary/>}/>
    </Routes> 
    </div>
    </Router>
  );
}

export default App;

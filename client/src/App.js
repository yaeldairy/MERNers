import './App.css';
import * as React from 'react'
import Flights from '../src/components/Flights'
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import FlightCreationForm from './components/FlightCreationForm';
import ViewFlight from './components/ViewFlight';
import UpdateFlight from './components/UpdateFlight';
import UserProfile from './components/RegUser/UserProfile';
import PurchaseHistory from './components/RegUser/PurchaseHistory';
import EditProfile from './components/RegUser/editProfile';

function App() {
  return (
    <Router>
    <div className="App">
     <Routes>
      <Route path="/" element={<Flights/>}/>
      <Route path="/newFlight" element={<FlightCreationForm/>}/>
      <Route path="/viewFlight/:id" element={<ViewFlight/>}/>
      <Route path="/updateFlight/:id" element={<UpdateFlight/>}/>
      <Route path="/profile/:id/" element={<UserProfile/>}/>
      <Route path="/profile/:id/purchases" element={<PurchaseHistory/>}/>
      <Route path="/profile/:id/edit" element={<EditProfile/>}/>
    </Routes> 
    </div>
    </Router>
  );
}

export default App;

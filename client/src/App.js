import './App.css';
import * as React from 'react'
import Flights from '../src/components/general/Flights'
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import FlightCreationForm from './components/FlightCreationForm';
import ViewFlight from './components/ViewFlight';
import UpdateFlight from './components/UpdateFlight';
import Summary from './components/Summary';
import Login from './components/general/Login';

function App() {
  return (
    <Router>
    <div className="App">
     <Routes>
      <Route path="/" element={<Flights/>}/>
      <Route path="/summary" element={<Summary/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/newFlight" element={<FlightCreationForm/>}/>
      <Route path="/viewFlight/:id" element={<ViewFlight/>}/>
      <Route path="/updateFlight/:id" element={<UpdateFlight/>}/>
    </Routes> 
    </div>
    </Router>
  );
}

export default App;

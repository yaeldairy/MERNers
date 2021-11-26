import './App.css';
// import UpdateFlight from './components/UpdateFlight';
// import Flights from '../src/components/Flights'
// import ViewFlight from './components/ViewFlight';
import * as React from 'react'
import Flights from '../src/components/Flights'
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import FlightCreationForm from './components/FlightCreationForm';
import ViewFlight from './components/ViewFlight';
import UpdateFlight from './components/UpdateFlight';
// import FlightCreationForm from './components/FlightCreationForm'
// import SearchForm from '../src/components/SearchForm';

function App() {
  return (
    <Router>
    <div className="App">
     <Routes>
      <Route path="/" element={<Flights/>}/>
      <Route path="/newFlight" element={<FlightCreationForm/>}/>
      <Route path="/viewFlight/:id" element={<ViewFlight/>}/>
      <Route path="/updateFlight/:id" element={<UpdateFlight/>}/>
    </Routes> 
    </div>
    </Router>
  );
}

export default App;

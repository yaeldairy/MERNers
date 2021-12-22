import './App.css';
import * as React from 'react'
import Flights from '../src/components/general/Flights'
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import PrivateRoute from './components/router/PrivateRoute';
import Checkout from './components/general/Checkout';
import FlightCreationForm from './components/FlightCreationForm';
import ViewFlight from './components/ViewFlight';
import UpdateFlight from './components/UpdateFlight';
import Login from './components/general/Login';
import Flight from './components/general/Flight';
import ReturnFlights from './components/general/ReturnFlights';
import ReturnFlight from './components/general/ReturnFlight';

function App() {
  return (
    <Router>
    <div className="App">
     <Routes>
      <Route path="/" element={<Flights/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/returnFlights" element={<ReturnFlights/>}/>
      <Route path="/newFlight" element={<FlightCreationForm/>}/>
      <Route path="/viewFlight/:id" element={ <Flight />}/>
      <Route path="/returnFlight/:id" element={ <ReturnFlight />}/>
      <Route path="/updateFlight/:id" element={<UpdateFlight/>}/>

    
      <Route exact path='/checkout' element={<PrivateRoute path='/checkout' />}>
        <Route path='/checkout' element={<Checkout />} />
      </Route>

    </Routes> 
    </div>
    </Router>
  );
}

export default App;

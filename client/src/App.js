import './App.css';
import * as React from 'react'
import Flights from '../src/components/general/Flights'
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import PrivateRoute from './components/router/PrivateRoute';
import Checkout from './components/general/Checkout';
import FlightCreationForm from './components/FlightCreationForm';
import ViewFlight from './components/ViewFlight';
import UpdateFlight from './components/UpdateFlight';
<<<<<<< HEAD
import SeatSelection from './components/SeatSelection';
import Login from './components/general/Login';
import Flight from './components/general/Flight';
import ReturnFlights from './components/general/ReturnFlights';
import ReturnFlight from './components/general/ReturnFlight';
=======
import UserProfile from './components/RegCustomer/userProfile';
import ReservationHistory from './components/RegCustomer/ReservationHistory';
import EditProfile from './components/RegCustomer/editProfile';
import ViewItinerary from './components/RegCustomer/viewItinerary';
>>>>>>> feature/userProfile

function App() {
  return (
    <Router>
    <div className="App">
     <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Flights/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/returnFlights" element={<ReturnFlights/>}/>
=======
      {/* <Route path="/" element={<Flights/>}/> */}
      <Route path="/" element={<UserProfile/>}/>
>>>>>>> feature/userProfile
      <Route path="/newFlight" element={<FlightCreationForm/>}/>
      <Route path="/viewFlight/:id" element={ <Flight />}/>
      <Route path="/returnFlight/:id" element={ <ReturnFlight />}/>
      <Route path="/updateFlight/:id" element={<UpdateFlight/>}/>
<<<<<<< HEAD

    
      <Route exact path='/checkout' element={<PrivateRoute path='/checkout' />}>
        <Route path='/checkout' element={<Checkout />} />
      </Route>

=======
      <Route path="/profile/:id/" element={<UserProfile/>}/>
      <Route path="/profile/:id/reservations" element={<ReservationHistory/>}/>
      <Route path="/profile/:id/edit" element={<EditProfile/>}/>
      <Route path="/profile/:id/reservations/:booking" element={<ViewItinerary/>}/>
>>>>>>> feature/userProfile
    </Routes> 
    </div>
    </Router>
  );
}

export default App;

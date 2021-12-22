import './App.css';
import * as React from 'react'
import Flights from '../src/components/general/Flights'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import PrivateRoute from './components/router/PrivateRoute';
import Checkout from './components/general/Checkout';
import FlightCreationForm from './components/FlightCreationForm';
import Flight from './components/Flight';
import UpdateFlight from './components/UpdateFlight';
import SeatSelection from './components/SeatSelection';
import Login from './components/general/Login';
import ReturnFlights from './components/general/ReturnFlights';
import ReturnFlight from './components/general/ReturnFlight';
import UserProfile from './components/RegCustomer/userProfile';
import ReservationHistory from './components/RegCustomer/ReservationHistory';
import EditProfile from './components/RegCustomer/editProfile';
import ViewItinerary from './components/RegCustomer/viewItinerary';

function App() {
      return (
            <Router>
                  <div className="App">
                        <Routes>
                              <Route path="/" element={<Flights />} />
                              <Route path="/login" element={<Login />} />
                              <Route path="/returnFlights" element={<ReturnFlights />} />
                              <Route path="/newFlight" element={<FlightCreationForm />} />
                              <Route path="/viewFlight/:id" element={<Flight />} />
                              <Route path="/returnFlight/:id" element={<ReturnFlight />} />
                              <Route path="/updateFlight/:id" element={<UpdateFlight />} />
                              <Route exact path='/checkout' element={<PrivateRoute path='/checkout' />} />
                              {/* <Route path='/checkout' element={<Checkout />} /> */}
                              <Route path="/profile/:id/" element={<UserProfile />} />
                              <Route path="/profile/:id/reservations" element={<ReservationHistory />} />
                              <Route path="/profile/:id/edit" element={<EditProfile />} />
                              <Route path="/profile/:id/reservations/:booking" element={<ViewItinerary />} />
                        </Routes>
                  </div>
            </Router>
      );
}

export default App;

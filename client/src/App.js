import './App.css';
import * as React from 'react';
import Flights from '../src/components/general/Flights';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import PrivateRoute from './components/router/PrivateRoute';
import Checkout from './components/user/Checkout';
import StripePay from './components/user/StripePay';
import FlightCreationForm from './components/FlightCreationForm';
import Flight from './components/general/Flight';
import UpdateFlight from './components/UpdateFlight';
//import SeatSelection from './components/user/SeatSelection';
import Login from './components/general/Login';
import ReturnFlights from './components/general/ReturnFlights';
import ReturnFlight from './components/general/ReturnFlight';
import UserProfile from './components/RegCustomer/userProfile';
import ReservationHistory from './components/RegCustomer/ReservationHistory';
import EditProfile from './components/RegCustomer/editProfile';
import ViewItinerary from './components/RegCustomer/viewItinerary';
import NavBar from './components/NavBar';
import AlternativeFlights from './components/user/AlternativeFlights';
import { UserContext } from "./Context";
import {Button} from 'antd';
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

//const stripePromise = loadStripe(pk_test_51KH6wELePquds3rDYJlyvrCVLkIFTijWyb18tDaHClW7hwQWJTXHLWIZYiozGJya6kMOytEBwRDkgrEkbEAkn5M300NXV6Gv06);
import ChangePassword from './components/user/ChangePassword';
//import AvailableFlights from './components/general/ReturnFlights';
// import { Navigate, useNavigate } from 'react-router-dom';

function App() {
      const { accessToken } = React.useContext(UserContext);
      console.log("APP"+accessToken);
      const path = '/';
      // let navigate = useNavigate();

      function handler(){
            // navigate("/login") 

      }

      return (<>
            {/* <NavBar /> */}
            <Router>
            {(accessToken)?(<NavBar style={{zIndex:2}}/>):(<></>)}
            {(!accessToken)?(<><Button type="primary" onClick={handler} style={{zIndex:2,float: "right", marginRight: '3%', marginTop: '2%'}}>
                  <Link to={{pathname:`/login`}} state={{ path }} >
                        Login
                        </Link>
                  </Button><br/></>):(<></>)}
                  <div className="App">

                        <Routes>
                              <Route path="/" element={<Flights />} />
                              <Route path="/login" element={<Login path='/' />} />
                              <Route path="/returnFlights" element={<ReturnFlights />} />
                              <Route path="/newFlight" element={<FlightCreationForm />} />
                              <Route path="/payment" element={<StripePay />} />
                              <Route path="/viewFlight/:id" element={<Flight />} />
                              <Route path="/returnFlight/:id" element={<ReturnFlight />} />
                              <Route path="/updateFlight/:id" element={<UpdateFlight />} />
                              <Route exact path='/checkout' element={<PrivateRoute path='/checkout' />}>
                                    <Route path='/checkout' element={<Checkout />} />
                              </Route>
                              <Route exact path='/changePassword' element={<PrivateRoute path='/changePassword' />}>
                                    <Route path='/changePassword' element={<ChangePassword />} />
                              </Route>
                              {/* <Route path="/profile/:username" element={<UserProfile />} /> */}
                              <Route exact path='/profile' element={<PrivateRoute path='/profile' />}>
                                    <Route path='/profile' element={<UserProfile />} />
                              </Route>
                              {/* <Route path="/profile/:username/reservations" element={<ReservationHistory />} /> */}
                              <Route exact path='/profile/:username/reservations' element={<PrivateRoute path='/profile/:username/reservations' />}>
                                    <Route path='/profile/:username/reservations' element={<ReservationHistory />} />
                              </Route>
                              {/* <Route path="/profile/:username/edit" element={<EditProfile />} /> */}
                              <Route exact path='/profile/:username/edit' element={<PrivateRoute path='/profile/:username/edit' />}>
                                    <Route path='/profile/:username/edit' element={<EditProfile />} />
                              </Route>
                              {/* <Route path="/profile/:username/reservations/:booking" element={<ViewItinerary />} /> */}
                              <Route exact path='/profile/:username/reservations/:booking' element={<PrivateRoute path='/profile/:username/reservations/:booking' />}>
                                    <Route path='/profile/:username/reservations/:booking' element={<ViewItinerary />} />
                              </Route>
                              <Route exact path='/changeFlight' element={<PrivateRoute path='/changeFlight' />}>
                                    <Route path='/changeFlight' element={<AlternativeFlights />} />
                              </Route>
                        </Routes>
                  </div>
            </Router>
            </>
            );
}

            export default App;

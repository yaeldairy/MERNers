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
import AlternativeFlight from './components/user/AlternativeFlight';
import PaymentForm from './components/user/PaymentForm';
//import SeatSelection from './components/user/SeatSelection';
import Login from './components/general/Login';
import NotFound404 from './components/response/NotFound404';
import ReturnFlights from './components/general/ReturnFlights';
import ReturnFlight from './components/general/ReturnFlight';
import UserProfile from './components/RegCustomer/userProfile';
import ReservationHistory from './components/RegCustomer/ReservationHistory';
import EditProfile from './components/RegCustomer/editProfile';
import ViewItinerary from './components/RegCustomer/viewItinerary';
import ChangeCheckout from './components/user/ChangeCheckout';
import NavBar from './components/NavBar';
import UserSignup from './components/UserSignup';
import AlternativeFlights from './components/user/AlternativeFlights';
import { UserContext } from "./Context";
import {Button , Layout} from 'antd';

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

//const stripePromise = loadStripe(pk_test_51KH6wELePquds3rDYJlyvrCVLkIFTijWyb18tDaHClW7hwQWJTXHLWIZYiozGJya6kMOytEBwRDkgrEkbEAkn5M300NXV6Gv06);
import ChangePassword from './components/user/ChangePassword';
import AdminLogin from './components/general/AdminLogin';
import SiderAdmin from './components/navigation/SiderAdmin';
import SiderUser from './components/navigation/SiderUser';
import HeaderNav  from './components/navigation/HeaderNav'

//import AvailableFlights from './components/general/ReturnFlights';
// import { Navigate, useNavigate } from 'react-router-dom';

function App() {
      const { accessToken, permissionLevel } = React.useContext(UserContext);
      console.log("APP"+accessToken);
      const path = '/';
      // let navigate = useNavigate();

      function handler(){
            // navigate("/login") 

      }

      return (<>
            {/* <NavBar /> */}
            <Router>
            {/*(accessToken)?(<NavBar style={{zIndex:2}}/>):(<></>)*/}
             <HeaderNav/>
            {/*(!accessToken)?(<><Button type="primary" onClick={handler} style={{zIndex:2,float: "right", marginRight: '3%', marginTop: '2%'}}>
                  <Link to={{pathname:`/login`}} state={{ path }} >
                        Login
                        </Link>
                  </Button><br/></>):(<></>)*/}
             <Layout style={{display: 'flex', flexDirection: 'row', overflow: 'hidden', height: 'calc(100vh - 64px)'}}>

            <Layout style={{flex: 0}}>
          
              {permissionLevel==1 && <SiderAdmin/>}
              {permissionLevel==2 && <SiderUser/>}
          
             </Layout>

             <Layout style={{
            flex: 1,
            paddingLeft: 50,
            paddingTop: 50,
            paddingRight: 20,
            paddingBottom: 50,
            overflowY: 'scroll'
             }}>
                  <div className="App">

                        <Routes>
                              <Route path="/" element={<Flights />} />
                              <Route path="/login" element={<Login path='/' />} />
                              <Route path="/adminLogin" element={<AdminLogin path='/' />} />
                              <Route path="/returnFlights" element={<ReturnFlights />} />

                              <Route exact path='/newFlight' element={<PrivateRoute path='/newFlight' />}>
                                    <Route path='/newFlight' element={<FlightCreationForm />} />
                              </Route>
                             
                              <Route path="/payment" element={<StripePay />} />
                              <Route path="/viewFlight/:id" element={<Flight />} />
                              <Route path="/returnFlight/:id" element={<ReturnFlight />} />
                              <Route path="/alternativeFlight/:id" element={<AlternativeFlight />} />
                              <Route path="/updateFlight/:id" element={<UpdateFlight />} />
                              <Route path='/signup' element={<UserSignup/>}/>

                              <Route exact path='/checkout' element={<PrivateRoute path='/checkout' />}>
                                    <Route path='/checkout' element={<Checkout />} />
                              </Route>
                              <Route exact path='/changeCheckout' element={<PrivateRoute path='/changeCheckout' />}>
                                    <Route path='/changeCheckout' element={<ChangeCheckout />} />
                              </Route>
                              <Route exact path='/changePassword' element={<PrivateRoute path='/changePassword' />}>
                                    <Route path='/changePassword' element={<ChangePassword />} />
                              </Route>
                              {/* <Route path="/profile/:username" element={<UserProfile />} /> */}
                              <Route exact path='/profile' element={<PrivateRoute path='/profile' />}>
                                    <Route path='/profile' element={<UserProfile />} />
                              </Route>
                              {/* <Route path="/profile/:username/reservations" element={<ReservationHistory />} /> */}
                              <Route exact path='/bookings' element={<PrivateRoute path='/bookings' />}>
                                    <Route path='/bookings' element={<ReservationHistory />} />
                              </Route>
                              {/* <Route path="/profile/:username/edit" element={<EditProfile />} /> */}
                              <Route exact path='/profile/:username/edit' element={<PrivateRoute path='/profile/:username/edit' />}>
                                    <Route path='/profile/:username/edit' element={<EditProfile />} />
                              </Route>
                              {/* <Route path="/profile/:username/reservations/:booking" element={<ViewItinerary />} /> */}
                              <Route exact path='/bookings/:booking' element={<PrivateRoute path='/bookings/:booking' />}>
                                    <Route path='/bookings/:booking' element={<ViewItinerary />} />
                              </Route>
                              <Route exact path='/changeFlight' element={<PrivateRoute path='/changeFlight' />}>
                                    <Route path='/changeFlight' element={<AlternativeFlights />} />
                              </Route>
                              <Route exact path='/payment' element={<PrivateRoute path='/payment' />}>
                                    <Route path='/payment' element={<PaymentForm />} />
                              </Route>
                              
                        </Routes>
                  </div>
                  </Layout>
                  </Layout>
            </Router>
            </>
            );
}

            export default App;

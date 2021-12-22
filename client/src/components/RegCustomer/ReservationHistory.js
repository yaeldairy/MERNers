import React, { useState, useEffect } from 'react'; //use effect is for renders
import { Divider, Typography, Select, List } from 'antd';
import "antd/dist/antd.css";
import { useLocation } from 'react-router-dom';
import FlightListItem from './FlightListItem';
import NavBar from '../NavBar';
const { Title } = Typography;



export default function ReservationHistory() {
    const location = useLocation();
    const { user } = location.state;
    const [userData, setUserData] = useState(user);
    const reservations = userData.flights;
    const bookings = userData.bookingReferences;
    console.log("USERRRRRRRRRRRRRRRRRRRRR");
    // console.log(userData);
    // console.log(userData.flights);
    // console.log(userData.bookingReferences);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
    var yyyy = today.getFullYear();
    //'DD-MM-YYYY'
    //str.substring(1, 4) from 0 to n-1
    //do I need a get?
    var tempTrip = null;
    // var htmlCode = '';
    var upcomingFlights = [];
    var previousFlights = [];
    useEffect(() => {
        getUpcomingTrips();
        // getPreviousTrips();
        console.log("upcoming");
        console.log(upcomingFlights[0].deptFlight.amount);
        console.log(upcomingFlights[0].deptFlight.amount);
        // console.log("previous");
        // console.log(previousFlights);
    })

    function getUpcomingTrips() {
        // htmlCode = '';
        for (const booking of bookings) {
            for (const trip of reservations) {
                console.log("booking" + booking);
                console.log(trip);
                if (trip.bookingNum === booking) {
                    if (trip.type === "departure") {
                        console.log(trip.date.substring(0, 2));
                        console.log(trip.date.substring(3, 5));
                        console.log(trip.date.substring(6, 10));
                        if ((trip.date.substring(6, 10) > yyyy) ||
                            (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) > mm) ||
                            (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) === mm && trip.date.substring(0, 2) > dd)) {
                            if (tempTrip == null) {
                                tempTrip = trip;
                                console.log("date");
                            }
                            else {
                                console.log("temp1: " + tempTrip);
                                console.log("trip1: " + trip);
                                // htmlCode = htmlCode + '<ul><FlightListItem booking={booking} deptFlight={trip} retFlight={tempTrip} amount={trip.amount + tempTrip.amount} userData={userData} editable={true} /> </ul>';
                                upcomingFlights.push({ booking: booking, deptFlight: trip, retFlight: tempTrip });
                                //pop tempTrip w trip men reservations
                                tempTrip = null;
                                break;
                            }
                        }
                    }
                    else {
                        if ((trip.date.substring(6, 10) > yyyy) ||
                            (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) > mm) ||
                            (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) === mm && trip.date.substring(0, 2) > dd)) {
                            if (tempTrip == null) {
                                console.log("date");
                                tempTrip = trip;
                            }
                            else {
                                console.log("temp2: " + tempTrip);
                                console.log("trip2: " + trip);
                                // htmlCode = htmlCode + '<ul><FlightListItem booking={booking} deptFlight={tempTrip} retFlight={trip} amount={trip.amount + tempTrip.amount} userData={userData} editable={true} /></ul>';
                                upcomingFlights.push({ booking: booking, deptFlight: tempTrip, retFlight: trip });
                                //pop tempTrip w trip men reservations
                                tempTrip = null;
                                break;
                            }
                        }

                    }
                }

            }
            tempTrip = null;
        }
    }


    function getPreviousTrips() {
        for (const booking of bookings) {
            for (const trip of reservations) {
                console.log("booking" + booking);
                console.log(trip);
                if (trip.bookingNum === booking) {
                    if (trip.type === "departure") {
                        console.log(trip.date.substring(0, 2));
                        console.log(trip.date.substring(3, 5));
                        console.log(trip.date.substring(6, 10));
                        if ((trip.date.substring(6, 10) < yyyy) ||
                            (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) < mm) ||
                            (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) === mm && trip.date.substring(0, 2) <= dd)) {
                            if (tempTrip == null) {
                                tempTrip = trip;
                                console.log("date");
                            }
                            else {
                                console.log("temp1: " + tempTrip);
                                console.log("trip1: " + trip);
                                // htmlCode = htmlCode + '<ul><FlightListItem booking={booking} deptFlight={trip} retFlight={tempTrip} amount={trip.amount + tempTrip.amount} userData={userData} editable={true} /> </ul>';
                                previousFlights.push({ booking: booking, deptFlight: trip, retFlight: tempTrip });
                                //pop tempTrip w trip men reservations
                                tempTrip = null;
                                break;
                            }
                        }
                    }
                    else {
                        if ((trip.date.substring(6, 10) < yyyy) ||
                            (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) < mm) ||
                            (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) === mm && trip.date.substring(0, 2) <= dd)) {
                            if (tempTrip == null) {
                                console.log("date");
                                tempTrip = trip;
                            }
                            else {
                                console.log("temp2: " + tempTrip);
                                console.log("trip2: " + trip);
                                // htmlCode = htmlCode + '<ul><FlightListItem booking={booking} deptFlight={tempTrip} retFlight={trip} amount={trip.amount + tempTrip.amount} userData={userData} editable={true} /></ul>';
                                previousFlights.push({ booking: booking, deptFlight: tempTrip, retFlight: trip });
                                //pop tempTrip w trip men reservations
                                tempTrip = null;
                                break;
                            }
                        }

                    }
                }

            }
            tempTrip = null;
        }
    }

    return (
        <>
        <NavBar/>
            <Title>Your Purchses</Title>
            <Divider />
            <h2>Upcoming trips: </h2>
            <br />
            <List dataSource={upcomingFlights}
                renderItem={flight => (
                    <ul><FlightListItem booking={flight.booking} deptFlight={flight.deptFlight} retFlight={flight.retFlight} amount={parseInt(flight.retFlight.totalPrice) + parseInt(flight.deptFlight.totalPrice)} userData={userData} editable={true} /></ul>

                )
                } />
            <Divider />

            <h2>Previous trips: </h2>
            <br />
            <List dataSource={previousFlights}
                renderItem={flight => (
                    <ul><FlightListItem booking={flight.booking} deptFlight={flight.deptFlight} retFlight={flight.retFlight} amount={parseInt(flight.retFlight.totalPrice) + parseInt(flight.deptFlight.totalPrice)} userData={userData} editable={false} /></ul>

                )
                } />
        </>
    )

}
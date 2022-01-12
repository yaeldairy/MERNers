import React, { useState, useEffect } from 'react';
import { Divider, Typography, Select, List } from 'antd';
import "antd/dist/antd.css";
import { useLocation } from 'react-router-dom';
import FlightListItem from './FlightListItem';
const { Title } = Typography;



export default function ReservationHistory() {
    const location = useLocation();
    const { user } = location.state;
    const [userData, setUserData] = useState(user);
    const reservations = userData.flights;
    const bookings = userData.bookingReferences;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
    var yyyy = today.getFullYear();
    var tempTrip = null;
    var upcomingFlights = [];
    var previousFlights = [];
    useEffect(() => {
        getUpcomingTrips();
        getPreviousTrips();

    })

    function getUpcomingTrips() {
        for (const booking of bookings) {
            for (const trip of reservations) {
                if (trip.bookingNumber === booking) {
                    if ((trip.date.substring(6, 10) > yyyy) ||
                        (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) > mm) ||
                        (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) === mm && trip.date.substring(0, 2) > dd)) {
                        if (trip.type === "departure")
                            if (tempTrip == null) {
                                tempTrip = trip;
                            }
                            else {
                                upcomingFlights.push({ booking: booking, deptFlight: trip, retFlight: tempTrip });
                                tempTrip = null;
                                break;
                            }
                    }

                    else {
                        if (tempTrip == null) {
                            tempTrip = trip;
                        }
                        else {
                            upcomingFlights.push({ booking: booking, deptFlight: tempTrip, retFlight: trip });
                            tempTrip = null;
                            break;
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
                if (trip.bookingNumber === booking) {
                    if ((trip.date.substring(6, 10) < yyyy) ||
                        (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) < mm) ||
                        (trip.date.substring(6, 10) === yyyy && trip.date.substring(3, 5) === mm && trip.date.substring(0, 2) <= dd)) {
                        if (trip.type === "departure")
                            if (tempTrip == null) {
                                tempTrip = trip;
                            }
                            else {
                                upcomingFlights.push({ booking: booking, deptFlight: trip, retFlight: tempTrip });
                                tempTrip = null;
                                break;
                            }
                    }

                    else {

                        if (tempTrip == null) {
                            tempTrip = trip;
                        }
                        else {
                            upcomingFlights.push({ booking: booking, deptFlight: tempTrip, retFlight: trip });
                            tempTrip = null;
                            break;
                        }
                    }

                }

            }
            tempTrip = null;
        }
    }


    return (
        <>
            <Title>Your Purchases</Title>
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
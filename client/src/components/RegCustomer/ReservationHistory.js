import React, { useState, useEffect } from 'react';
import { Divider, Typography, Select, List, Card } from 'antd';
import "antd/dist/antd.css";
import { useLocation } from 'react-router-dom';
import FlightListItem from './FlightListItem';
import { speedDialActionClasses } from '@mui/material';
const { Title } = Typography;



export default function ReservationHistory() {
    const location = useLocation();
    const { user } = location.state;
    const [upcomingFlights, setUpcomingFlights] = useState([]);
    const [previousFlights, setPreviousFlights] = useState([]);
    const [userData, setUserData] = useState(user);
    const reservations = userData.flights;//<------ new API call
    const bookings = userData.bookingReferences;//<------ new API call
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
    var yyyy = today.getFullYear();
    var tempTrip = null;
    //var upcomingFlights = [];
    //var previousFlights = [];

    useEffect(() => {
        
        console.log(bookings)
         getUpcomingTrips();
         getPreviousTrips();
    }, []);



    function getUpcomingTrips() {
        console.log("upcoming")
        let upcoming=[]
        for (const booking of bookings) {
            console.log(booking);
            for (const trip of reservations) {
                if (trip.bookingNumber == booking) {
                    if (trip.type === "departure") {
                        // console.log(trip.date);
                        if ((trip.date.substring(6, 10) > yyyy) ||
                            (trip.date.substring(6, 10) == yyyy && trip.date.substring(3, 5) > mm) ||
                            (trip.date.substring(6, 10) == yyyy && trip.date.substring(3, 5) == mm && trip.date.substring(0, 2) > dd)) {
                            // console.log("in")
                            if (tempTrip == null) {
                                //console.log("temp set")
                                tempTrip = trip;
                            }
                            else {
                                upcoming.push({ booking: booking, deptFlight: tempTrip, retFlight: trip });
                                //console.log("pushed");
                                tempTrip = null;
                                break;
                            }
                        }
                    }
                    else {
                        if (tempTrip == null) {
                            tempTrip = trip;
                            //console.log("temp set")
                        }
                        else {
                            //console.log("pushed")
                            upcoming.push({ booking: booking, deptFlight: trip, retFlight: tempTrip });
                            tempTrip = null;
                            break;
                        }
                    }
                }

            }
            
            tempTrip = null;
        }
        // console.log("UPCOMING TRIPS------------------------")
        // console.log(upcomingFlights)
        setUpcomingFlights(upcoming)
    }

    function getPreviousTrips() {

        // console.log("previous")
        let previous =[]
        for (const booking of bookings) {
            for (const trip of reservations) {
                if (trip.bookingNumber === booking) {
                    if (trip.type === "departure") {
                        console.log(trip.date);
                        if ((trip.date.substring(6, 10) < yyyy) ||
                            (trip.date.substring(6, 10) == yyyy && trip.date.substring(3, 5) < mm) ||
                            (trip.date.substring(6, 10) == yyyy && trip.date.substring(3, 5) == mm && trip.date.substring(0, 2) <= dd)) {
                            // console.log("in")
                            if (tempTrip == null) {
                                //console.log("temp set")
                                tempTrip = trip;
                            }
                            else {
                                previous.push({ booking: booking, deptFlight: trip, retFlight: tempTrip });
                                //console.log("pushed");
                                tempTrip = null;
                                break;
                            }
                        }
                    }
                    else {
                        if (tempTrip == null) {
                            tempTrip = trip;
                            //console.log("temp set")
                        }
                        else {
                            //console.log("pushed")
                            previous.push({ booking: booking, deptFlight: tempTrip, retFlight: trip });
                            tempTrip = null;
                            break;
                        }
                    }
                }

            }
            
            tempTrip = null;
        }
        setPreviousFlights(previous)
    }


    return(
    <>
        <Card title={<Title level={2} style={{ textAlign: 'left' }}>Upcoming trips:</Title>} bordered={true} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%' }} >
            <List dataSource={upcomingFlights}
                renderItem={flight => (
                    <ul><FlightListItem booking={flight.booking} deptFlight={flight.deptFlight} retFlight={flight.retFlight} amount={parseInt(flight.retFlight.price) + parseInt(flight.deptFlight.price)} userData={userData} editable={true} /></ul>

                )
                } /></Card>
        <Divider />

        <Card title={<Title level={2} style={{ textAlign: 'left' }}>Previous trips:</Title>} bordered={true} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%' }}>
            <List dataSource={previousFlights}
                renderItem={flight => (
                    <ul><FlightListItem booking={flight.booking} deptFlight={flight.deptFlight} retFlight={flight.retFlight} amount={parseInt(flight.retFlight.price) + parseInt(flight.deptFlight.price)} userData={userData} editable={false} /></ul>

                )
                } /></Card>
    </>
    )

}

import React, { useEffect, useContext } from 'react'
import {UserContext} from "../../Context";

function SeatReservationDetails({flight, selectedSeats, cabin}) {

    const {username} = useContext(UserContext);
    //let flightNumber = 'AC 3012';//TODO get flight number from DB
    let bookingClass = cabin;//TODO get booking class from DB
    console.log("flight in seat seatSelection")
      console.log(flight)
      console.log(selectedSeats);
   
    useEffect(()=>{
      console.log("flight in seat seatSelection")
      console.log(flight)
    }, [])

    return (
        <div className='seatReservationDetails'>
            <p className='legendText'>Booking Passenger </p>
            <div>

                <p className='nameStyling'>{username}</p>
            </div>
            <p className='legendText'>Flight Information </p>

            <div>
                <p className='SRDetialsText'>{flight.flightNum} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {cabin}</p>
            </div>
            <p className='legendText'>Selected Seat(s)</p>
            <div>

                <p className='selectedSeatStyling'>{selectedSeats.map(seat => <>{seat + ' '}</>)}</p>
            </div>


        </div>
    )
}

export default SeatReservationDetails

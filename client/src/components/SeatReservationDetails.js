import React from 'react'
function SeatReservationDetails(props) {
    let name = 'Yasser'; //TODO get name from DB
    let flightNumber = 'AC 3012';//TODO get flight number from DB
    let bookingClass = 'Economy';//TODO get booking class from DB
    let selectedSeats = props.currentSelectedSeats;//TODO get this form the passed prop

    return (
        <div>

        <div>
            Booking Passenger 
            <h2>{name}</h2>
        </div>

        <div>
            {flightNumber}
            <br/>
            {bookingClass}
        </div>

        <div>
            Selected Seat(s)
           <h1>{selectedSeats.map(seat => <>{seat + ' '}</>)} </h1> 
        </div>
        
            
        </div>
    )
}

export default SeatReservationDetails

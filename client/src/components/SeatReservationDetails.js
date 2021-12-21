import React from 'react'
function SeatReservationDetails(props) {
    let name = 'Yasser Sheweta'; //TODO get name from DB
    let flightNumber = 'AC 3012';//TODO get flight number from DB
    let bookingClass = 'Economy';//TODO get booking class from DB
    let selectedSeats = props.currentSelectedSeats;//TODO get this form the passed prop

    return (
        <div className='seatReservationDetails'>
            <p className='legendText'>Booking Passenger </p>
            <div>

                <p className='nameStyling'>{name}</p>
            </div>
            <p className='legendText'>Flight Information </p>

            <div>
                <p className='SRDetialsText'>{flightNumber} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {bookingClass}</p>
            </div>
            <p className='legendText'>Selected Seat(s)</p>
            <div>

                <p className='selectedSeatStyling'>{selectedSeats.map(seat => <>{seat + ' '}</>)}</p>
            </div>


        </div>
    )
}

export default SeatReservationDetails

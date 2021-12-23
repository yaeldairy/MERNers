import '../../App.css';
import SeatButton from './SeatButton';
import React, { useEffect, useState } from 'react'
export default function BusinessClassRowSS({flight, updateFinalSelectionList,setCompleted,totalSeats}) {
    //const totalSeats = 0; //TODO get from DB. This is the total number of seats in the booking
    const [selectedSeats, setSelectedSeats] = useState([])
    const [remainingSeats, setRemainingSeats] = useState(totalSeats)
    let rows = [];
    let seatNumber = flight.nOfBusiness;//total number of seats in business class
    let startIndex = flight.nOfFirst+1;
    for (let index = startIndex; index <= startIndex + Math.ceil(seatNumber / 6.0); index++) {
        rows.push(index);
    }
    let missingSeats = ((Math.ceil(seatNumber / 6.0)) * 6) - seatNumber;
    let secondSeatClass = (missingSeats > 4) ? 'seat nCSeat' : 'seat availableSeat';
    let thirdSeatClass = (missingSeats > 3) ? 'seat nCSeat' : 'seat availableSeat';
    let foruthSeatClass = (missingSeats > 2) ? 'seat nCSeat' : 'seat availableSeat';
    let fifthSeatClass = (missingSeats > 1) ? 'seat nCSeat' : 'seat availableSeat';
    let sixthSeatClass = (missingSeats > 0) ? 'seat nCSeat' : 'seat availableSeat';

    function handleSeatSelected(selectedSeat) {
        let newSeatList = [...selectedSeats] // clones the selected seat array
        newSeatList.push(selectedSeat);
        setSelectedSeats(newSeatList);
        setRemainingSeats(remainingSeats-1)
    }

    function handleSeatDeselected(DeselectedSeat) {
        let newSeatList = [...selectedSeats];
        newSeatList = newSeatList.filter(e => e !== DeselectedSeat);
        setSelectedSeats(newSeatList);
        setRemainingSeats(remainingSeats+1)
    }
    
    useEffect(()=>{
        console.log("Business seats"+ totalSeats)

    },[])

    useEffect(() => {
        console.log(selectedSeats)
        updateFinalSelectionList(selectedSeats);
    }, [selectedSeats])
    let economyClassSeats = rows.map(row => {
        if (row === rows.length) {
            return (
                <div className='FirstClassrow' key={row}>
                    <div className='seatSet'>
                        <SeatButton id={row + 'A'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                        <SeatButton id={row + 'B'} initialClass={secondSeatClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                        <SeatButton id={row + 'C'} initialClass={thirdSeatClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                    </div>
                    <div className='rowNumber'>
                        <p>{row}</p>
                    </div>
                    <div className='seatSet'>
                        <SeatButton id={row + 'D'} initialClass={foruthSeatClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                        <SeatButton id={row + 'E'} initialClass={fifthSeatClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                        <SeatButton id={row + 'F'} initialClass={sixthSeatClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='FirstClassrow' key={row}>
                    <div className='seatSet'>
                        <SeatButton id={row + 'A'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                        <SeatButton id={row + 'B'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                        <SeatButton id={row + 'C'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                    </div>
                    <div className='rowNumber'>
                        <p>{row}</p>
                    </div>
                    <div className='seatSet'>
                        <SeatButton id={row + 'D'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                        <SeatButton id={row + 'E'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                        <SeatButton id={row + 'F'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats}></SeatButton>
                    </div>
                </div>
            )

        }
    }
    );

    return (
        <div>
            {
                economyClassSeats
            }
        </div>
    );
}
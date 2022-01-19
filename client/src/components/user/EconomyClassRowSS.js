import '../../App.css';
import SeatButton from './SeatButton';
import React, { useEffect, useState } from 'react'
export default function EconomyClassRowSS({flight,updateFinalSelectionList,setCompleted,totalSeats, initialSeats}) {
   // const totalSeats = 2; //0 if not selected cabin
    const [selectedSeats, setSelectedSeats] = useState(initialSeats)
    const remainingSeatsInitial = totalSeats - initialSeats.length 
    const [remainingSeats, setRemainingSeats] = useState(remainingSeatsInitial)
    let rows = [];
    let seatNumber = flight.nOfEconomy;//total number of economy seats
    let startIndex = Math.ceil(flight.nOfFirst / 4.0) +  Math.ceil(flight.nOfBusiness / 6.0) + 2;
    
    for (let index = startIndex; index <= startIndex + Math.ceil(seatNumber / 6.0) -1; index++) {
        rows.push(index);
    }
    let missingSeats = ((Math.ceil(seatNumber / 6.0)) * 6) - seatNumber;
    console.log('Missing Seats:', missingSeats)
    let secondSeatClass = (missingSeats > 4) ? 'seat nCSeat' : 'seat availableSeat'; //5
    let thirdSeatClass = (missingSeats > 3) ? 'seat nCSeat' : 'seat availableSeat'; //4
    let foruthSeatClass = (missingSeats > 2) ? 'seat nCSeat' : 'seat availableSeat'; //3
    let fifthSeatClass = (missingSeats > 1) ? 'seat nCSeat' : 'seat availableSeat'; //2
    let sixthSeatClass = (missingSeats > 0) ? 'seat nCSeat' : 'seat availableSeat'; //1

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

    useEffect(() => {
        updateFinalSelectionList(selectedSeats);
        if (remainingSeats == 0){
            setCompleted(true)
        }
        else if (remainingSeats > 1){
            setCompleted(false)
        }
    }, [selectedSeats])
    
    let economyClassSeats = rows.map(row => {
        if (row === rows.length + startIndex -1) {
            return (
                <div className='FirstClassrow' key={row}>
                    <div className='seatSet'>
                        <SeatButton id={row + 'A'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                        <SeatButton id={row + 'B'} initialClass={secondSeatClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                        <SeatButton id={row + 'C'} initialClass={thirdSeatClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                    </div>
                    <div className='rowNumber'>
                        <p>{row}</p>
                    </div>
                    <div className='seatSet'>
                        <SeatButton id={row + 'D'} initialClass={foruthSeatClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                        <SeatButton id={row + 'E'} initialClass={fifthSeatClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                        <SeatButton id={row + 'F'} initialClass={sixthSeatClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='FirstClassrow' key={row}>
                    <div className='seatSet'>
                        <SeatButton id={row + 'A'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                        <SeatButton id={row + 'B'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                        <SeatButton id={row + 'C'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                    </div>
                    <div className='rowNumber'>
                        <p>{row}</p>
                    </div>
                    <div className='seatSet'>
                        <SeatButton id={row + 'D'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                        <SeatButton id={row + 'E'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                        <SeatButton id={row + 'F'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
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
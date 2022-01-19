import '../../App.css';
import React, { useEffect, useState } from 'react'
import SeatButton from './SeatButton';
export default function FirstClassRowSS({flight, updateFinalSelectionList,setCompleted,totalSeats, initialSeats}) {

    //const totalSeats = 0; //TODO get from DB. This is the total number of seats in the booking
    const [selectedSeats, setSelectedSeats] = useState(initialSeats)
    const remainingSeatsInitial = totalSeats - initialSeats.length 
    const [remainingSeats, setRemainingSeats] = useState(remainingSeatsInitial)

    let rows = [];
    let seatNumber = flight.nOfFirst; //no of seats in first class
    for (let index = 1; index <= Math.ceil(seatNumber / 4.0); index++) {
        rows.push(index);
    }
    useEffect(()=>{
        console.log("First seats"+ totalSeats)

    },[])

    let missingSeats = ((Math.ceil(seatNumber / 4.0)) * 4) - seatNumber;
    let lastClass = (missingSeats > 0) ? 'seat nCSeat' : 'seat availableSeat';
    let secondLastClass = (missingSeats > 1) ? 'seat nCSeat' : 'seat availableSeat';
    let thirdLastClass = (missingSeats > 2) ? 'seat nCSeat' : 'seat availableSeat';

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
        if (remainingSeats == 0){
            setCompleted(true)
        }
        else if (remainingSeats > 1){
            setCompleted(false)
        }
    }, [selectedSeats])

    let firstClassSeats = rows.map(row => {
        if (row === rows.length) {
            return (
                <div className='FirstClassrow' key={row}>
                    <div className='seatSet'>
                        <SeatButton id={row + 'A'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}> </SeatButton>
                        <SeatButton id={row + 'C'} initialClass={thirdLastClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                    </div>
                    <div className='rowNumber'>
                        <p>{row}</p>
                    </div>
                    <div className='seatSet'>
                        <SeatButton id={row + 'D'} initialClass={secondLastClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                        <SeatButton id={row + 'F'} initialClass={lastClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='FirstClassrow' key={row}>
                    <div className='seatSet'>
                        <SeatButton id={row + 'A'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                        <SeatButton id={row + 'C'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
                    </div>
                    <div className='rowNumber'>
                        <p>{row}</p>
                    </div>
                    <div className='seatSet'>
                        <SeatButton id={row + 'D'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats} takenSeats={flight.takenSeats} initialSeats = {initialSeats}></SeatButton>
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
                firstClassSeats
            }
        </div>
    );
}
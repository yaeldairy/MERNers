import '../App.css';
import React, { useEffect, useState } from 'react'
import SeatButton from './SeatButton';
export default function FirstClassRowSS(props) {
    const totalSeats = 0; //TODO get from DB. This is the total number of seats in the booking
    const [selectedSeats, setSelectedSeats] = useState([])
    const [remainingSeats, setRemainingSeats] = useState(totalSeats)

    let rows = [];
    let seatNumber = 10; //TODO get this from DB
    for (let index = 1; index <= Math.ceil(seatNumber / 4.0); index++) {
        rows.push(index);
    }
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
        console.log(selectedSeats)
        props.updateFinalSelectionList(selectedSeats);
    }, [selectedSeats])

    let firstClassSeats = rows.map(row => {
        if (row === rows.length) {
            return (
                <div className='FirstClassrow' key={row}>
                    <div className='seatSet'>
                        <SeatButton id={row + 'A'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats}> </SeatButton>
                        <SeatButton id={row + 'C'} initialClass={thirdLastClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats}></SeatButton>
                    </div>
                    <div className='rowNumber'>
                        <p>{row}</p>
                    </div>
                    <div className='seatSet'>
                        <SeatButton id={row + 'D'} initialClass={secondLastClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats}></SeatButton>
                        <SeatButton id={row + 'F'} initialClass={lastClass} addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats}></SeatButton>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='FirstClassrow' key={row}>
                    <div className='seatSet'>
                        <SeatButton id={row + 'A'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats}></SeatButton>
                        <SeatButton id={row + 'C'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats}></SeatButton>
                    </div>
                    <div className='rowNumber'>
                        <p>{row}</p>
                    </div>
                    <div className='seatSet'>
                        <SeatButton id={row + 'D'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats}></SeatButton>
                        <SeatButton id={row + 'F'} initialClass='seat availableSeat' addSeat={handleSeatSelected} removeSeat={handleSeatDeselected} remainingSeats = {remainingSeats} totalSeats = {totalSeats}></SeatButton>
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
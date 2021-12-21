import { Card, Button, message } from 'antd';
import '../App.css';
import FirstClassRowSS from './FirstClassRowSS'
import EconomyClassRowSS from './EconomyClassRowSS'
import BusinessClassRowSS from './BusinessClassRowSS'
import React, { useEffect, useState } from 'react'
import SSLegend from './SSLegend';
import SeatReservationDetails from './SeatReservationDetails';
export default function SeatSelection() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isDone, setDone] = useState(false);
    
    function handleSeatSelected(currentSelectedSeats){
        setSelectedSeats(currentSelectedSeats);
    }

    function handleCompleted(isCompleted){
        setDone(isCompleted);
    }

    function buttonHandler(event){
        if (!isDone){
            message.error('Kindly select seats for all members of you reservation');
        }
        else{
            message.success('Successful')
        }
    }
    return (
        <div>
        <div className='seatSelectionLayout'>
            <div>
                <SeatReservationDetails currentSelectedSeats = {selectedSeats} />
            </div>
            <div className='seatMap'>
                <Card style={{ width: 400 }}>
                    <div className='rowNumber'>
                        <p>First Class</p>
                    </div>
                    <FirstClassRowSS updateFinalSelectionList = {handleSeatSelected} setCompleted = {handleCompleted}/>
                    <div className='rowNumber'>
                        <p>Business Class</p>
                    </div>
                    <BusinessClassRowSS updateFinalSelectionList = {handleSeatSelected} setCompleted = {handleCompleted} />
                    <div className='rowNumber'>
                        <p>Economy Class</p>
                    </div>
                    <EconomyClassRowSS updateFinalSelectionList = {handleSeatSelected} setCompleted = {handleCompleted} />
                </Card>
            </div>
        </div>
        <Button type="primary" onClick={buttonHandler}>
          Submit
        </Button>
        </div>
    );
}
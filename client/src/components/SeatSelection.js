import { Card, Button, message, Space } from 'antd';
import '../App.css';
import FirstClassRowSS from './FirstClassRowSS'
import EconomyClassRowSS from './EconomyClassRowSS'
import BusinessClassRowSS from './BusinessClassRowSS'
import React, { useEffect, useState } from 'react'
import SSLegend from './SSLegend';
import SeatReservationDetails from './SeatReservationDetails';
import axios from 'axios';
export default function SeatSelection() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isDone, setDone] = useState(false);

    function handleSeatSelected(currentSelectedSeats) {
        setSelectedSeats(currentSelectedSeats);
    }

    function handleCompleted(isCompleted) {
        setDone(isCompleted);
    }

    function buttonHandler(event) {
        if (!isDone) {
            message.error('Kindly select seats for all members of you reservation');
        }
        else {
            //TODO pass the parameters correctly
            axios.patch('http://localhost:3001/user/selectSeats', { userId: '61c0de62c47e7d8fee6ff52d', seats: selectedSeats, flightId: '61a3bc8e819c80059970a284' })
                .then((res) => {
                    // console.log(res)
                    message.success('Seats Selected Successfully. Redirecting...', 2)
                        .then(function () {

                        }
                        )
                })
                .catch((err) => {
                    message.error('Unable to connect to the server. Please try again later.');
                    // console.log(err)
                })
        }
    }
    return (
        <div className='seatSelectionMain'>
            <div className='leftHalfSS'>
                <SeatReservationDetails currentSelectedSeats={selectedSeats} />
                <SSLegend />
                <div className='buttonsContainer'>
                    <Space size={100}>
                    <Button>Cancel</Button>
                    <Button type="primary" onClick={buttonHandler}>Confirm Seat Selection</Button>
                    </Space>
                </div>
            </div>
            <div className='rightHalfSS'>
                <div className='rightHalfSSinner'>
                    <div className='seatMap'>
                        <div className='planeStyling'>
                            <div className='rowNumber'>
                                <p>First Class</p>
                            </div>
                            <FirstClassRowSS updateFinalSelectionList={handleSeatSelected} setCompleted={handleCompleted} />
                            <div className='rowNumber'>
                                <p>Business Class</p>
                            </div>
                            <BusinessClassRowSS updateFinalSelectionList={handleSeatSelected} setCompleted={handleCompleted} />
                            <div className='rowNumber'>
                                <p>Economy Class</p>
                            </div>
                            <EconomyClassRowSS updateFinalSelectionList={handleSeatSelected} setCompleted={handleCompleted} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
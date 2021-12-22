import { Card, Button, message, Space } from 'antd';
import '../../App.css';
import FirstClassRowSS from './FirstClassRowSS'
import EconomyClassRowSS from './EconomyClassRowSS'
import BusinessClassRowSS from './BusinessClassRowSS'
import React, { useEffect, useState, useContext } from 'react'
import SSLegend from './SSLegend';
import SeatReservationDetails from './SeatReservationDetails';
import {UserContext} from "../../Context";
import axios from 'axios';

export default function SeatSelection({flight}) {
    
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isDone, setDone] = useState(false);
    const {accessToken, username, cabin, noOfSeats} = useContext(UserContext);

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
            // axios.patch('http://localhost:3001/user/selectSeats', { username: username, seats: selectedSeats, flightId: flight._id })
            //     .then((res) => {
            //         // console.log(res)
            //         message.success('Seats Selected Successfully. Redirecting...', 2)
            //             .then(function () {

            //             }
            //             )
            //     })
            //     .catch((err) => {
            //         message.error('Unable to connect to the server. Please try again later.');
            //     })

            axios({
                method: 'patch', //should be patch
                url: 'http://localhost:3001/user/selectSeats',   
                headers: { Authorization: `Bearer ${accessToken}`},
                data : { username: username, seats: selectedSeats, flightId: flight._id}})
                      .then((res) => {
                    // console.log(res)
                    message.success('Seats Selected Successfully. Redirecting...', 2)
                        .then(function () {

                        }
                        )
                })
                .catch((err) => {
                    message.error('Unable to connect to the server. Please try again later.');
                })


        }
    }
    return (
        <div className='seatSelectionMain'>
            <div className='leftHalfSS'>
                <SeatReservationDetails selectedSeats={selectedSeats} flight={flight}/>
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
                            <FirstClassRowSS flight={flight}
                                             updateFinalSelectionList={handleSeatSelected} 
                                             setCompleted={handleCompleted}
                                             totalSeats={cabin =="First" ? noOfSeats.number :0 } />
                            <div className='rowNumber'>
                                <p>Business Class</p>
                            </div>
                            <BusinessClassRowSS flight={flight}
                                                updateFinalSelectionList={handleSeatSelected} 
                                                setCompleted={handleCompleted} 
                                                totalSeats={cabin =="Business" ? noOfSeats.number :0 }/>
                            <div className='rowNumber'>
                                <p>Economy Class</p>
                            </div>
                            <EconomyClassRowSS flight={flight}
                                               updateFinalSelectionList={handleSeatSelected} 
                                               setCompleted={handleCompleted}
                                               totalSeats={cabin =="Economy" ? noOfSeats.number :0 } />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
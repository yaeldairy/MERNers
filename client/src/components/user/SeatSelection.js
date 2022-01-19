import { Button, message, Space, Popconfirm } from 'antd';
import '../../App.css';
import FirstClassRowSS from './FirstClassRowSS'
import EconomyClassRowSS from './EconomyClassRowSS'
import BusinessClassRowSS from './BusinessClassRowSS'
import React, { useState, useContext } from 'react'
import SSLegend from './SSLegend';
import SeatReservationDetails from './SeatReservationDetails';
import { UserContext } from "../../Context";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SeatSelection({ flight, setRedirect, cabin, noOfSeats, preChangeSeats, booking }) {
    let navigate = useNavigate();
    const initialSeats = (preChangeSeats) ? preChangeSeats : [];
    const [selectedSeats, setSelectedSeats] = useState(initialSeats);
    const [isDone, setDone] = useState(false);
    const { accessToken, username } = useContext(UserContext);

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
            console.log(username)
            console.log(selectedSeats)
            console.log(flight._id)
            axios({
                method: 'patch', //should be patch
                url: 'http://localhost:3001/user/selectSeats',
                headers: { Authorization: `Bearer ${accessToken}` },
                data: { username: username, seats: selectedSeats, flightId: flight._id }
            })
                .then((res) => {
                    message.success('Seats Selected Successfully.')
                    navigate('/')
                    navigate(`/bookings/${booking}`, { state: { booking: booking } })
                })
                .catch((err) => {
                    console.log(err)
                    message.error('Unable to connect to the server. Please try again later.');
                    navigate('/')
                    navigate(`/bookings/${booking}`, { state: { booking: booking } })
                })


        }
    }



    return (
        <div className='seatSelectionMain'>
            <div className='leftHalfSS'>
                <SeatReservationDetails selectedSeats={selectedSeats} flight={flight} cabin={cabin} />
                <SSLegend />
                <div className='buttonsContainer'>
                    <Space size={100}>
                        <Button onClick={() => { setRedirect(false) }}>Cancel</Button>
                        <Button type="primary">
                            <Popconfirm
                                title="Are you sure you want to select these seats?"
                                onConfirm={buttonHandler}
                                okText="Yes"
                                cancelText="No"
                            >
                                Confirm Seat Selection
                            </Popconfirm>
                        </Button>
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
                                totalSeats={cabin === "First" ? noOfSeats.number : 0}
                                initialSeats={preChangeSeats} />
                            <div className='rowNumber'>
                                <p>Business Class</p>
                            </div>
                            <BusinessClassRowSS flight={flight}
                                updateFinalSelectionList={handleSeatSelected}
                                setCompleted={handleCompleted}
                                totalSeats={cabin === "Business" ? noOfSeats.number : 0}
                                initialSeats={preChangeSeats} />
                            <div className='rowNumber'>
                                <p>Economy Class</p>
                            </div>
                            <EconomyClassRowSS flight={flight}
                                updateFinalSelectionList={handleSeatSelected}
                                setCompleted={handleCompleted}
                                totalSeats={cabin === "Economy" ? noOfSeats.number : 0}
                                initialSeats={preChangeSeats} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Button, Card, Typography } from 'antd';
import { FaPlane, FaLongArrowAltRight } from "react-icons/fa";
import axios from 'axios';
import { message, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../Context";
const { Title, Text } = Typography;


const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}
const displayFlex = { display: "flex", direction: "row", marginTop: '10px' }


function FlightListItem({ booking, deptFlight, retFlight, amount, userData, editable }) {
    let navigate = useNavigate();
    const { accessToken } = useContext(UserContext);
    const location = useLocation();
    console.log(location.pathname); 
    // var vis = true;

    const title = (<div style={displayFlex}>
        <FaPlane style={{ fontSize: '300%' }} />
        <Title style={{ marginLeft: '15px' }} level={3} >Booking: {booking}</Title>
    </div>)

    function handler() {
        const emailBody = `<p>Hello ${userData.firstName} ${userData.lastName},</p>
        <br/>
        <p>This is to confirm the cancellation of your reservation for booking ${booking}, flights ${deptFlight.flightNum} and ${retFlight.flightNum}. You will be refunded with an amount of $${amount} within the next 5-7 working days.</p>
        <br/>
        <p>Best wishes,</p>
        <p>ACL Airlines</p>`;
        const hide = message.loading('Cancelling your reservation...', 0);
        axios({
            method: 'POST',
            url: 'http://localhost:3001/user/cancelReservation',
            data: {
                username: userData.username,
                booking: booking,
                deptFlight: deptFlight,
                retFlight: retFlight,
                email: userData.email,
                emailBody: emailBody
                // },
                //     headers: {
                //       'Authorization': `Bearer ${accessToken}`
            }, headers: {
                'Authorization': `Bearer ${accessToken}`
            }

        }
        ).then((res) => {
            hide()
            message.success('Reservation cancelled. A confirmation email will be sent.', 2);
            navigate('/');

        }).catch((err) => {
            hide()
            message.error('Unable to connect to the server. Please try again later.');

        });

    };

    return (
        <div>
            <Card 
                style={{ marginTop: 16, 
                    // visibility: vis ? 'visible' : 'hidden' 
                }}
                type="inner"
                title={title}
                extra={<><Button style={{display: 'block'}}><Link to={{ pathname: `/bookings/${booking}` }} state={{ booking: booking, userData: userData, deptFlight: deptFlight, retFlight: retFlight, amount }}>
                    View Itinerary
                </Link>
                </Button>&nbsp;
                    {editable ? <Button type="primary" style={{buttonStyle, display: 'block'}}>
                        <Popconfirm title="Are you sure you want to cancel this trip?" onConfirm={handler} okText="Yes" cancelText="No">
                            <a href="#">Cancel Trip</a>
                        </Popconfirm>
                    </Button> : <></>}
                </>}
            >

                <div style={displayFlex}>
                    <h2>{deptFlight.deptAirport}</h2>
                    <FaLongArrowAltRight style={{ fontSize: '150%', marginTop: '10px' }} />
                    <h2>{deptFlight.arrAirport}</h2>
                    <div style={{ marginLeft: '30px' }}>
                        <Text style={{ fontSize: '120%' }} italic>Flight date: {deptFlight.date}</Text>
                        <Text style={{ fontSize: '120%', marginLeft: '15px' }} italic>Departure time: {deptFlight.deptTime}</Text>
                        <Text style={{ fontSize: '120%', marginLeft: '15px' }} italic>Arrival time: {deptFlight.arrTime}</Text>
                    </div>
                </div>

                <div style={displayFlex}>
                    <h2>{retFlight.deptAirport}</h2>
                    <FaLongArrowAltRight style={{ fontSize: '150%', marginTop: '10px' }} />
                    <h2>{retFlight.arrAirport}</h2>
                    <div style={{ marginLeft: '30px' }}>
                        <Text style={{ fontSize: '120%' }} italic>Flight date: {retFlight.date}</Text>
                        <Text style={{ fontSize: '120%', marginLeft: '15px' }} italic>Departure time: {retFlight.deptTime}</Text>
                        <Text style={{ fontSize: '120%', marginLeft: '15px' }} italic>Arrival time: {retFlight.arrTime}</Text>
                    </div>
                </div>
                <div>
                    <Text>Total amount: {amount}</Text>
                </div>
            </Card>
        </div>



    );
}
export default FlightListItem;

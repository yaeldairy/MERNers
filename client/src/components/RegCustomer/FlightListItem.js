import React from 'react';
import 'antd/dist/antd.css';
import { Button, Card, Typography } from 'antd';
import { FaPlane, FaLongArrowAltRight, FaSortAmountDown } from "react-icons/fa";
import axios from 'axios';
import { message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from "../../Context";
const { accessToken } = useContext(UserContext);
const { Title, Text } = Typography;


const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}
const displayFlex = { display: "flex", direction: "row", marginTop: '10px' }


function FlightListItem({ booking, deptFlight, retFlight, amount, userData, editable }) {

    const title = (<div style={displayFlex}>
        <FaPlane style={{ fontSize: '300%' }} />
        <Title style={{ marginLeft: '15px' }} level={3} >Booking: {booking}</Title>
    </div>)

    function handler() {

        const hide = message.loading('Cancelling your reservation...', 0);
        axios({
            method: 'POST',
            url: 'http://localhost:3001/user/cancelFlight',
            data: {
                userId: userData._id,
                booking: booking
                // },
                //     headers: {
                //       'Authorization': `Bearer ${accessToken}`
            },headers: {
                'Authorization': `Bearer ${accessToken}`
              }

        }).then((res) => {
            hide()
            message.success('Reservation cancelled. A confirmation email will be sent.', 2);
            //send email
            const emailBody = `<p>Hello ${userData.firstname} ${userData.lastname},</p>
        <br/>
        <p>This is to confirm the cancellation of your reservation for booking ${booking}, flights ${deptFlight.flightNumber} and ${retFlight.flightNumber}. You will be refunded with an amount of ${amount} within the next 5-7 working days.</p>
        <br/>
        <p>Best wishes,</p>
        <p>ACL Airlines</p>`;
            axios.post("http://localhost:3001/user/sendEmail", {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                },
                data:{email: userData.email,
                        emailBody: emailBody}
              })
                .then(() => {
                    // console.log("email sent", res);

                }
                ).catch((err) => {
                    console.log("error", err);
                });
            //

        }).catch((err) => {
            hide()
            message.error('Unable to connect to the server. Please try again later.');

        });

    };

    return (
        <div>

            <Card
                style={{ marginTop: 16 }}
                type="inner"
                title={title}
                extra={<><Button><Link to={{ pathname: `/profile/${userData._id}/reservations/${booking}` }} state={{ booking: booking, deptFlight: deptFlight, retFlight: retFlight, amount: amount }}>
                    View Itinerary
                </Link>
                </Button>
                    {editable ? <Button type="primary" style={buttonStyle}>
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

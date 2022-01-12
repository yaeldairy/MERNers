import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card, Divider, Typography, Button } from 'antd';
import { message } from 'antd';
import axios from 'axios';
import { FaPlane } from "react-icons/fa";
import { UserContext } from "../../Context";
const { Title } = Typography;


export default function ReservationHistory() {
    const location = useLocation();
    const { accessToken } = useContext(UserContext);
    const { booking, deptFlight, retFlight, amount, userData } = location.state;
    // console.log(deptFlight.seat.length==0);
    
    function sendEmail(){
        const emailBody = `<p>Hello ${userData.firstName} ${userData.lastName},</p>
            <br/>
            <p>This is your itinerary for your booking ${booking}.</p>
            <br/>
            <p>Departure Flight: ${deptFlight.flightNum}</p>
            <p>Departure Airport: ${deptFlight.deptAirport}</p>
            <p>Arrival Flight: ${deptFlight.arrAirport}</p>
            <p>Date: ${deptFlight.date}</p>
            <p>Departure time: ${deptFlight.deptTime}</p>
            <p>Arrival time: ${deptFlight.arrTime}</p>
            <p>Cabin: ${deptFlight.cabin}</p>
            <br/>
            <p>Departure Flight: ${retFlight.flightNum}</p>
            <p>Departure Airport: ${retFlight.deptAirport}</p>
            <p>Arrival Flight: ${retFlight.arrAirport}</p>
            <p>Date: ${retFlight.date}</p>
            <p>Departure time: ${retFlight.deptTime}</p>
            <p>Arrival time: ${retFlight.arrTime}</p>
            <p>Cabin: ${retFlight.cabin}</p>
            <br/>
            <p>Enjoy your trip!</p>
            <br/>
            <p>Best wishes,</p>
            <p>ACL Airlines</p>`;
        const hide = message.loading('Sending your email...', 0);
        axios({
            method: 'POST',
            url: 'http://localhost:3001/user/sendEmail',
            data: {
                email: userData.email,
                emailBody: emailBody

            }, headers: {
                'Authorization': `Bearer ${accessToken}`
            }

        }
        ).then((res) => {
            hide()
            message.success('An email with your itinerary was sent', 2);

        }).catch((err) => {
            hide()
            message.error('Unable to connect to the server. Please try again later.');

        });

    }
    const email = (<div><Button onClick={sendEmail}>
        Email Copy
    </Button>
    </div>)
    return (
        <div>

            <Card title={<Title level={2}>{booking} Itinerary</Title>} bordered={true} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%' }} extra={email} >
                <Card title={<div style={{ display: "flex", direction: "row", marginTop: '10px' }} type="inner">
                    <FaPlane style={{ fontSize: '250%' }} />
                    <Title style={{ marginLeft: '15px' }} level={4} >Flight: {deptFlight.flightNum}</Title>
                </div>} extra={<><a href="#" style={{display: 'block'}}>Change Flight</a><a href="#" style={{display: 'block'}}>Edit Seats</a></>} bordered={true} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%' }}>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Departure airport:</Col>
                        <Col span={28}>{deptFlight.deptAirport}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Arrival airport:</Col>
                        <Col span={28}>{deptFlight.arrAirport}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Date:</Col>
                        <Col span={28}>{deptFlight.date}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Departure time:</Col>
                        <Col span={28}>{deptFlight.deptTime}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Arrival time:</Col>
                        <Col span={28}>{deptFlight.arrTime}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Cabin:</Col>
                        <Col span={28}>{deptFlight.cabin}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Seats:</Col>
                        {(deptFlight.seat.length===0?<Col span={28}>Not Specified</Col>:<Col span={28}>{deptFlight.seat.join()}</Col>)}
                    </Row>
                </Card>
                <Divider />
                <Card title={<div style={{ display: "flex", direction: "row", marginTop: '10px' }} type="inner">
                    <FaPlane style={{ fontSize: '250%' }} />
                    <Title style={{ marginLeft: '15px' }} level={4} >Flight: {retFlight.flightNum}</Title>
                </div>} extra={<><a href="#" style={{display: 'block'}}>Change Flight</a><a href="#" style={{display: 'block'}}>Edit Seats</a></>} bordered={true} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%' }}>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Flight number:</Col>
                        <Col span={28}>{retFlight.flightNum}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Departure airport:</Col>
                        <Col span={28}>{retFlight.deptAirport}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Arrival airport:</Col>
                        <Col span={28}>{retFlight.arrAirport}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Date:</Col>
                        <Col span={28}>{retFlight.date}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Departure time:</Col>
                        <Col span={28}>{retFlight.deptTime}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Arrival time:</Col>
                        <Col span={28}>{retFlight.arrTime}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Cabin:</Col>
                        <Col span={28}>{retFlight.cabin}</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{textAlign: 'left'}}>Seats:</Col>
                        {(retFlight.seat.length===0?<Col span={28}>Not Specified</Col>:<Col span={28}>{retFlight.seat.join()}</Col>)}
                    </Row>
                </Card>
            </Card>

        </div>
    )
}
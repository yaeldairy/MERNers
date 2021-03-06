import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Row, Col, Card, Divider, Typography, Button } from 'antd';
import { message } from 'antd';
import axios from 'axios';
import { FaPlane } from "react-icons/fa";
import { UserContext } from "../../Context";
import SeatSelection from '../user/SeatSelection';
import { listItemTextClasses } from '@mui/material';
const { Title } = Typography;


export default function ViewItinerary() {

    const location = useLocation();
    const { accessToken } = useContext(UserContext);
    const [retFlight, setRetFlight] = useState(null);
    const [deptFlight, setDeptFlight] = useState(null);
    let { booking, editable } = location.state;
    const [redirectSSD, setRedirectSSD] = useState(false);
    const [redirectSSR, setRedirectSSR] = useState(false);
    const [currentFlight, setCurrentFlight] = useState({});
    // var dseats = "Not Specified"
    // var rseats = "Not Specified";
    if(!editable)
    editable = true;


    useEffect(() => {
        async function fetchData() {
            await axios({
                method: 'GET',
                url: 'http://localhost:3001/user/booking',

                params: {
                    bookingNum: booking
                }
                ,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((res) => {
                    let responseObject = res.data;
                    setDeptFlight(responseObject.deptFlight)
                    setRetFlight(responseObject.retFlight)
                    // console.log("HEREEEEEEEEEEEEEEEEEEE")
                    // console.log(responseObject.deptFlight.takenSeats.length==0)
                    // console.log(deptFlight.takenSeats)
                    // if (responseObject.deptFlight.takenSeats.length !== 0)
                   
                    //     dseats = deptFlight.takenSeats

                    // if (responseObject.retFlight.takenSeats.length !== 0)
                    //     rseats = retFlight.takenSeats
                })
                .catch((err) => {
                    console.log(err);
                    console.log('Unable to access DB') //TODO maybe change it to display an error message
                })
        }
        fetchData();

    }, [])

    const [currentSelectedSeats, setCurrentSelectedSeats] = useState([]);
    //console.log(deptFlight.seat.length==0);

    //const [currentSelectedSeats, setCurrentSelectedSeats] = useState([]);
    // console.log(deptFlight.seat.length==0);
    const onChangeSeatDClick = (e) => {
        e.preventDefault();
        axios({
            method: 'GET',
            url: 'http://localhost:3001/user/getFlight',

            params: {
                flightId: deptFlight._id
            }
            ,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                setCurrentFlight(res.data);
                setRedirectSSD(true);
            })
            .catch((err) => {
                console.log('Unable to get flight details')
            })
    }

    const onChangeSeatRClick = (e) => {
        e.preventDefault();
        axios({
            method: 'GET',
            url: 'http://localhost:3001/user/getFlight',

            params: {
                flightId: retFlight._id
            }
            ,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                setCurrentFlight(res.data);
                setRedirectSSR(true);
            })
            .catch((err) => {
                console.log('Unable to get flight details')
            })
    }
    if (redirectSSD) {
        return <SeatSelection flight={currentFlight} setRedirect={setRedirectSSD} cabin={deptFlight.cabin} noOfSeats={deptFlight.noOfSeats} preChangeSeats={deptFlight.takenSeats} booking={booking} />
    }

    if (redirectSSR) {
        return <SeatSelection flight={currentFlight} setRedirect={setRedirectSSR} cabin={retFlight.cabin} noOfSeats={retFlight.noOfSeats} preChangeSeats={retFlight.takenSeats} booking={booking} />
    }



    function sendEmail() {
        const emailBody = `<p>Hello,</p>
            <br/>
            <p>This is your itinerary for your booking ${booking}.</p>
            <br/>
            <p>Departure Flight: ${deptFlight.flightNum}</p>
            <p>Departure Airport: ${deptFlight.deptAirport}</p>
            <p>Arrival Flight: ${deptFlight.arrAirport}</p>
            <p>Date: ${deptFlight.date}</p>
            <p>Departure time: ${deptFlight.deptTime}</p>
            <p>Arrival time ${deptFlight.arrTime}</p>
            <p>Cabin: ${deptFlight.cabin}</p>
            
            <br/>
            <p>Departure Flight: ${retFlight.flightNum}</p>
            <p>Departure Airport: ${retFlight.deptAirport}</p>
            <p>Arrival Flight: ${retFlight.arrAirport}</p>
            <p>Date: ${retFlight.date}</p>
            <p>Departure time: ${retFlight.deptTime}</p>
            <p>Arrival time: :${retFlight.arrTime}</p>
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
                emailBody
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
    const email = (<div><Button type='primary' onClick={sendEmail}>
        Email Copy
    </Button>
    </div>)
    return (
        <div>
            {deptFlight && retFlight &&
                <Card title={<Title style={{ textAlign: 'left' }} level={2}>{booking} Itinerary</Title>} bordered={true} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%' }} extra={email} >
                    <Card title={<div style={{ display: "flex", direction: "row", marginTop: '10px' }} type="inner">
                        <FaPlane style={{ fontSize: '250%' }} />
                        <Title style={{ marginLeft: '15px' }} level={4} >Flight: {deptFlight.flightNum}</Title>
                    </div>} extra={editable ? <>
                        <a href="#" style={{ display: 'block' }}>
                            <Link to={{ pathname: `/changeFlight` }} state={{ type: deptFlight.type, flight: deptFlight, seatType: deptFlight.cabin }} >
                                Change Flight
                            </Link>
                        </a><a href="#" style={{ display: 'block' }}
                            onClick={onChangeSeatDClick}
                        >Edit Seats</a></> : <></>} bordered={true} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%' }}>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Departure airport:</Col>
                            <Col span={28}>{deptFlight.deptAirport}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Arrival airport:</Col>
                            <Col span={28}>{deptFlight.arrAirport}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Date:</Col>
                            <Col span={28}>{deptFlight.date}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Departure time:</Col>
                            <Col span={28}>{deptFlight.deptTime}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Arrival time:</Col>
                            <Col span={28}>{deptFlight.arrTime}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Cabin:</Col>
                            <Col span={28}>{deptFlight.cabin}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Seats:</Col>
                            {(deptFlight.takenSeats.length === 0 ? <Col span={28}>Not Specified</Col> : <Col span={28}>{deptFlight.takenSeats.join()}</Col>)}
                        </Row>
                    </Card>
                    <Divider />
                    <Card title={<div style={{ display: "flex", direction: "row", marginTop: '10px' }} type="inner">
                        <FaPlane style={{ fontSize: '250%' }} />
                        <Title style={{ marginLeft: '15px' }} level={4} >Flight: {retFlight.flightNum}</Title>
                    </div>} extra={editable ? <><a href="#" style={{ display: 'block' }}>
                        <Link to={{ pathname: `/changeFlight` }} state={{ type: retFlight.type, flight: retFlight, seatType: retFlight.cabin }} >
                            Change Flight
                        </Link>
                    </a><a href="#" style={{ display: 'block' }}
                        onClick={onChangeSeatRClick}
                    >Edit Seats</a></> : <></>} bordered={true} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%' }}>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Flight number:</Col>
                            <Col span={28}>{retFlight.flightNum}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Departure airport:</Col>
                            <Col span={28}>{retFlight.deptAirport}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Arrival airport:</Col>
                            <Col span={28}>{retFlight.arrAirport}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Date:</Col>
                            <Col span={28}>{retFlight.date}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Departure time:</Col>
                            <Col span={28}>{retFlight.deptTime}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Arrival time:</Col>
                            <Col span={28}>{retFlight.arrTime}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Cabin:</Col>
                            <Col span={28}>{retFlight.cabin}</Col>
                        </Row>
                        <Row>
                            <Col span={8} style={{ textAlign: 'left' }}>Seats:</Col>
                            {(retFlight.takenSeats.length === 0 ?
                                <Col span={28}>Not Specified</Col> :
                                <Col span={28}>{retFlight.takenSeats.join()}</Col>)}
                        </Row>
                    </Card>
                </Card>
            }
        </div>
    )
}
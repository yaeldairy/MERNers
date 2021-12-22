import React from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';


export default function ReservationHistory() {
    const location = useLocation();
    const { booking, deptFlight, retFlight, amount } = location.state;


    return (
        <div>
            <h1>Itinerary for booking {booking}</h1>
            <p>Total amount paid: {amount}</p>
            <Row>
                <Col span={12}>
                    <Row>Departure Flight</Row>
                    <Row>
                        <Col span = {8}>Flight number:</Col>
                        <Col span = {28}>{deptFlight.flightNum}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Departure airport:</Col>
                        <Col span = {28}>{deptFlight.deptAirport}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Arrival airport:</Col>
                        <Col span = {28}>{deptFlight.arrAirport}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Date:</Col>
                        <Col span = {28}>{deptFlight.date}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Departure time:</Col>
                        <Col span = {28}>{deptFlight.deptTime}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Arrival time:</Col>
                        <Col span = {28}>{deptFlight.arrTime}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Cabin:</Col>
                        <Col span = {28}>{deptFlight.cabin}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Seats:</Col>
                        <Col span = {28}>{deptFlight.seats}</Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>Return Flight</Row>
                    <Row>
                        <Col span = {8}>Flight number:</Col>
                        <Col span = {28}>{retFlight.flightNum}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Departure airport:</Col>
                        <Col span = {28}>{retFlight.deptAirport}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Arrival airport:</Col>
                        <Col span = {28}>{retFlight.arrAirport}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Date:</Col>
                        <Col span = {28}>{retFlight.date}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Departure time:</Col>
                        <Col span = {28}>{retFlight.deptTime}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Arrival time:</Col>
                        <Col span = {28}>{retFlight.arrTime}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Cabin:</Col>
                        <Col span = {28}>{retFlight.cabin}</Col>
                    </Row>
                    <Row>
                        <Col span = {8}>Seats:</Col>
                        <Col span = {28}>{retFlight.seats}</Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
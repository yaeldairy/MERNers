import React, { useEffect, useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import axios from 'axios';
import { Button, message } from 'antd';
import { Row, Col, Divider, Form } from 'antd';
import { UserContext } from "../../Context";
const { accessToken } = useContext(UserContext);


export default function UserProfile() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { userID } = location.state;
  const [userData, setUserData] = useState(null);

  // const userData =
  // {
  //   _id: "61c253a68aed84cae46284a5",
  //   username: "Ahmed1",
  //   password: "ahmed123",
  //   firstName: "ahmed",
  //   lastName: "mohammed",
  //   homeAddress: "Cairo",
  //   countryCode: "+20",
  //   phoneNumber: "01005648989",
  //   email: "y.aeldairy@gmail.com",
  //   passportNumber: "A89786755",
  //   bookingReferences: ["KHGVFCDFGH"],
  //   flights: [{
  //     flightId: "61a3bc8e819c80059970e8bd",
  //     bookingNum:"KHGVFCDFGH",
  //     deptAirport: "LAX",
  //     arrAirport: "JFK",
  //     deptTime: "07:20",
  //     arrTime: "15:33",
  //     date: "12-01-2022",
  //     totalPrice: "700",
  //     type: "departure",
  //     seat: ["B2","B3"]
  //   },
  //   {
  //     flightId: "61a3bc8e819c80059970e8bd",
  //     bookingNum:"KHGVFCDFGH",
  //     deptAirport: "JFK",
  //     arrAirport: "LAX",
  //     deptTime: "07:20",
  //     arrTime: "15:33",
  //     date: "12-01-2023",
  //     totalPrice: "500",
  //     type: "arrival",
  //     seat: ["A3", "A2"]
  //   }] 
  // }

  useEffect(() => {
    axios.get('http://localhost:3001/user/getProfile', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((res) => {
        setUserData(res.data)

      })
      .catch((e) => {
        setError(true)
      })

    setLoading(false);
  }, []);

  return (
    <>
      {error ? (<div> ERROR </div>) : (
        loading ? (<div>Loading... </div>) :
          (
      <div>
        <br />
        <h1>Hello {userData.firstName} {userData.lastName}!</h1>{/*  put somewhere else */}
        <Divider />
        <br />
        <Row>
          <Col span={8} >Username: </Col>
          <Col span={28} >{userData.username}</Col>
        </Row>
        <Row>
          <Col span={8}>E-mail: </Col>
          <Col span={28}>{userData.email}</Col>
        </Row>
        <Row>
          <Col span={8}>Address: </Col>
          <Col span={28} justifyContent="flex-end">{userData.homeAddress}</Col>
        </Row>
        <Row>
          <Col span={8}>Telephone Number: </Col>
          <Col span={28} justifyContent="flex-end">{userData.countryCode}{userData.phoneNumber}</Col>
        </Row>
        <Row>
          <Col span={8}>Passport Number: </Col>
          <Col span={28} justifyContent="flex-end">{userData.passportNumber}</Col>
        </Row>

        <Divider />
        <div justify="space-around">
          <Button type="primary" size="large">
            <Link to={{ pathname: `/profile/${userData._id}/edit` }} state={{ user: userData }}>
              Edit Profile
            </Link>
          </Button>
          <Button type="primary" size="large">
            <Link to={{ pathname: `/profile/${userData._id}/password` }} state={{ userData: userData }}>
              Change Password
            </Link>
          </Button>
          <Button type="primary" size="large">
            <Link to={{ pathname: `/profile/${userData._id}/reservations` }} state={{ user: userData }}>
              View Reservations
            </Link>
          </Button>
        </div>

      </div>
       ))}
    </>
  )


}
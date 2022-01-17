import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Descriptions, Card, Typography } from 'antd';

import { Button } from 'antd';
import { Row, Col, Divider } from 'antd';
import { UserContext } from "../../Context";
import axios from 'axios';
import DescriptionsItem from 'antd/lib/descriptions/Item';
const { Title } = Typography;



export default function UserProfile() {
  const { accessToken } = useContext(UserContext);
  const location = useLocation();
  const [userData, setUserData] = useState([]);
 
  useEffect(() => {
    console.log("USERRRRR " +userData)
    console.log("ACCESS "+ accessToken)
    // if (accessToken == null)
    //   return <Navigate to="/login" state={{ path: '/' }} />;
    if (location.state == null) {
      axios.get('http://localhost:3001/user/getProfile', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then((res) => {
          setUserData(res.data);
          console.log("prof res" + res.data);

        })
        .catch((err) => {
          console.log("prof err" + err)
        })
    }
    else {
      const { user } = location.state;
      setUserData(user);
    }
  },[]);

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

  return (
      <div>
        <Card title={<Title level={2} style={{textAlign:'left'}}>Profile</Title>} bordered={true} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%' }} >
       <Descriptions layout="horizontal" column={1} bordered>
        <Descriptions.Item label="Username" >
        {userData.username}
        </Descriptions.Item>
        <Descriptions.Item label="Email" >
        {userData.email}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span>
        {userData.homeAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Telephone Number" span>
        {userData.countryCode}{userData.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Passport Number" >
        {userData.passportNumber}
        </Descriptions.Item>
        </Descriptions>
        </Card>

        <Divider />
        <div justify="space-around">
          <Button type="primary" size="large">
            <Link to={{ pathname: `/profile/${userData.username}/edit` }} state={{ user: userData }}>
              Edit Profile
            </Link>
          </Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" size="large">
            <Link to={{ pathname: `/changePassword` }} >
              Change Password
            </Link>
          </Button>
          {/* <Button type="primary" size="large">
                  <Link to={{ pathname: `/profile/${userData.username}/reservations` }} state={{ user: userData }}>
                    View Reservations
                  </Link>
                </Button> */}
        </div>

      </div>
  )


}
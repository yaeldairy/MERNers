import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Descriptions, Card, Typography } from 'antd';
import { Button } from 'antd';
import { Row, Col, Divider } from 'antd';
import { UserContext } from "../../Context";
import axios from 'axios';
import NetworkError from '../response/NetworkError';
import DescriptionsItem from 'antd/lib/descriptions/Item';
const { Title } = Typography;



export default function UserProfile() {
  const { accessToken } = useContext(UserContext);
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(false);
 
  useEffect(() => {
   // console.log("USERRRRR " +userData)
   // console.log("ACCESS "+ accessToken)
  
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
          setError(true)
        })
    }
    else {
      const { user } = location.state;
      setUserData(user);
    }
  },[]);

  if (error) {
    return (<NetworkError/>)
  }

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
        </div>

      </div>
  )


}
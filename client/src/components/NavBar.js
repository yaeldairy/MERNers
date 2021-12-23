import React, { useEffect, useState, useContext } from 'react';
import { Menu, message } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';
import { MenuItem } from '@mui/material';
import { UserContext } from "../Context";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function NavBar() {
    const [userData, setUserData] = useState([]);
    const { accessToken } = useContext(UserContext);

    const copyToClip = () => {
        // navigator.clipboard.writeText('aclairlines@gmail.com')
        // message.success('email copied to clipboard', 3);
      };

    useEffect(() => {
        if(accessToken==null)
            return <></>;
        console.log("ACCESS "+ accessToken)
        axios.get('http://localhost:3001/user/getProfile', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                setUserData(res.data);
                console.log("nav res" + res.data.username);

            })
            .catch((err) => {
                console.log("nav err" + err)
            })

    }, []);


    return (
        <>
        {userData ?(
        <Menu
            // onClick={this.handleClick}
            style={{ width: 1500,display:"flex", flexDirection:"row" }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            {/* <HomeOutlined><Link to={{ pathname: `/` }} /></HomeOutlined> */}
            <MenuItem style={{ width: 1000}}>Hello {userData.firstName} {userData.lastName}</MenuItem>
            <Menu icon={<UserOutlined />} title="Profile" style={{ width: 700,display:"flex", flexDirection:"row" }}>
                <Menu.Item style={{ width: 250}} >
                    <Link to={{ pathname: `/profile` }} state={{ user: userData }}>
                    Your Account
                    </Link>
                </Menu.Item>
                <Menu.Item style={{ width: 250}} >
                    <Link to={{ pathname: `/profile/${userData.username}/reservations` }} state={{ user: userData }}>
                        Bookings
                    </Link>
                </Menu.Item>
            </Menu>

            <Menu.Item icon={<MailOutlined />}  onClick={copyToClip}>
                    Contact Us
            </Menu.Item>
            {/* {this.state.copySuccess} */}
            <Menu.Item icon={<LogoutOutlined />}>
                <Link to={{ pathname: `` }}>
                    Logout
                </Link>
            </Menu.Item>


         </Menu> 
         ):(<></>)}
        </>
    );

}

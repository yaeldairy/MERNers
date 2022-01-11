import React, { useEffect, useState, useContext } from 'react';
import { Menu, message } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined, MailOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { MenuItem } from '@mui/material';
import { UserContext } from "../Context";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function NavBar() {
    const [userData, setUserData] = useState([]);
    const { accessToken } = useContext(UserContext);

    const copyToClip = () => {
        navigator.clipboard.writeText('aclairlines@gmail.com')
        message.success('Email copied to clipboard', 5);
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
            style={{ width: 1500,display:"flex", flexDirection:"row", display:"flex"}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
           
            <MenuItem style={{ width: 250}}><Link to={{pathname:`/`}}><HomeOutlined/>   Hello {userData.firstName} {userData.lastName}!</Link></MenuItem>
            {/* <Menu icon={<UserOutlined />} title="Profile" style={{ }}> */}
                <Menu.Item icon = {<UserOutlined/>}style={{ width: 250}} >
                    <Link to={{ pathname: `/profile` }} state={{ user: userData }}>
                    Your Account
                    </Link>
                </Menu.Item>
                <Menu.Item icon={<UnorderedListOutlined />} style={{ width: 250}} >
                    <Link to={{ pathname: `/profile/${userData.username}/reservations` }} state={{ user: userData }}>
                        Bookings
                    </Link>
                </Menu.Item>
            {/* </Menu> */}

            <Menu.Item icon={<MailOutlined />} style={{ width: 250}} onClick={copyToClip}>
                    Contact Us
            </Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} style={{ width: 250}}>
                <Link to={{ pathname: `/` }}>
                    Logout
                </Link>
            </Menu.Item>


         </Menu> 
         ):(<></>)}
        </>
    );

}

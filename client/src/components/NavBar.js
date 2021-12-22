import React, { useEffect, useState, useContext } from 'react';
import { Menu, message } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';
import { MenuItem } from '@mui/material';
import { UserContext } from "../Context";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function NavBar() {
    const [userData, setUserData] = useState(null);
    const { accessToken } = useContext(UserContext);

    const copyToClip = () => {
        navigator.clipboard.writeText('aclairlines@gmail.com')
        message.success('email copied to clipboard', 3);
      };

    useEffect(() => {
        axios.get('http://localhost:3001/user/getProfile', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                setUserData(res.data);
                console.log("nav res" + res);

            })
            .catch((err) => {
                console.log("nav err" + err)
            })

    }, []);


    return (
        <Menu
            // onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <HomeOutlined><Link to={{ pathname: `/` }} /></HomeOutlined>
            <MenuItem>Hello {userData.firstName} {userData.lastName}</MenuItem>
            <Menu icon={<UserOutlined />} title="Profile">
                <Menu.Item  >
                    <Link to={{ pathname: `/profile/${userData.username}` }} state={{ user: userData }}>
                        Your Account
                    </Link>
                </Menu.Item>
                <Menu.Item  >
                    <Link to={{ pathname: `/profile/${userData.username}/reservations` }} state={{ user: userData }}>
                        Reservations
                    </Link>
                </Menu.Item>
            </Menu>

            <Menu.Item icon={<MailOutlined />}  onClick={copyToClip}>
                    Contact Us
            </Menu.Item>
            {this.state.copySuccess}
            <Menu.Item icon={<LogoutOutlined />}>
                <Link to={{ pathname: `` }}>
                    Logout
                </Link>
            </Menu.Item>


        </Menu>
    );

}

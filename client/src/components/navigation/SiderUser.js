import React, {useContext, useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { HomeOutlined, UserOutlined, LogoutOutlined, MailOutlined, UnorderedListOutlined } from '@ant-design/icons';
import {Link } from 'react-router-dom'
import {Layout, Menu, message} from 'antd';
import { UserContext } from '../../Context';
import { MenuItem } from '@mui/material';
import axios from 'axios';

const {Sider} = Layout;
const {SubMenu} = Menu;


function SiderUser() {

  const [collapsed, SetCollapsed] = useState(true)
  const {cycleId} = useContext(UserContext)
  const [userData, setUserData] = useState([]);
const { accessToken } = useContext(UserContext);

    const copyToClip = () => {
        navigator.clipboard.writeText('aclairlines@gmail.com')
        message.success('Email copied to clipboard', 1);
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
  
  const onCollapse = collapsed => {
    console.log(collapsed);
    SetCollapsed(collapsed);
  };

  return (
    <div>

      <Sider collapsible collapsed={collapsed}
             onCollapse={onCollapse}
             className='side-bar'
             style={{
               overflow: 'auto',
               height: '100vh',
               zIndex: '10000',
               left: 0,
              
             }}>

        <Menu id="menu" theme='dark' defaultSelectedKeys={['1']} mode="inline">

       
            {/* <Menu icon={<UserOutlined />} title="Profile" style={{ }}> */}
            <Menu.Item key="1" icon={<HomeOutlined style={{color:'white'}}/>}>
              <Link to={"/"} style={{color: 'white'}}>All Flights</Link>
            </Menu.Item>
                <Menu.Item icon = {<UserOutlined/>}style={{ width: 250}} >
                    <Link to={{ pathname: `/profile` }} state={{ user: userData }}>
                    Your Account
                    </Link>
                </Menu.Item>
                <Menu.Item icon={<UnorderedListOutlined />} style={{ width: 250}} >
                    <Link to={{ pathname: `/bookings` }} state={{ user: userData }}>
                        Bookings
                    </Link>
                </Menu.Item>
            {/* </Menu> */}

            <Menu.Item icon={<MailOutlined />} style={{ width: 250}} onClick={copyToClip}>
                    Contact Us
            </Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} style={{ width: 250}}
             onClick ={()=>{
              localStorage.clear()
              window.location.replace('http://localhost:3000');
             // window.location.reload()
           }} >
              Logout         
            </Menu.Item>   
        </Menu>
      </Sider>


    </div>
  );
}


export default SiderUser;
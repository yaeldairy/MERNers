import React from 'react';
import 'antd/dist/antd.css';
import { useState, useContext, useEffect } from 'react';
import {Avatar, Layout, Menu, Button} from 'antd';
import {LoginOutlined } from '@ant-design/icons';
import { Redirect , Link} from 'react-router-dom';
import { UserContext } from "../../Context";

const {Header} = Layout;

function HeaderNav() {

  const { accessToken } = useContext(UserContext);

  return (
    <Header  id="header"
            style={{
              overflow: 'auto',
              width: "100%",
              zIndex: '1000',
              left: 0,
            }}>
      <div style={{display: 'flex', flexDirection:'row-reverse'}}>
      <img src='/logo.png' className='logo'/>  
     { !accessToken &&
      <Menu theme="dark" mode="horizontal" id="menu" defaultSelectedKeys={['1']}>
      <Menu.Item key="10" icon={  <LoginOutlined  style={{color:'white'}}/>}>
            <Link to={"/login"} style={{color: 'white'}}>Login</Link>
      </Menu.Item>  
      </Menu>
     }       
      </div>
   
        <img  src='/logo.png' className='logo'/>   
     
        
    </Header>
  );
}
export default HeaderNav;
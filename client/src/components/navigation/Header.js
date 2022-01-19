import React from 'react';
import 'antd/dist/antd.css';

import {Avatar, Layout, Menu} from 'antd';

import {CrownOutlined, LogoutOutlined, SketchOutlined, UserOutlined} from '@ant-design/icons';
import { Redirect , Link} from 'react-router-dom';

const {Header} = Layout;

function Header() {
  return (
    <Header  id="header"
            style={{
              overflow: 'auto',
              width: "100%",
              zIndex: '1000',
              left: 0,
            }}>
      <div style={{display: 'flex', flexDirection:'row-reverse'}}>
  </div>
     
      <Menu theme="dark" mode="horizontal" id="m" defaultSelectedKeys={['1']}>
      
      <Menu.Item key="2" icon={  <PlusOutlined  style={{color:'white'}}/>}>
            <Link to={"/login"} style={{color: 'white'}}>Login</Link>
      </Menu.Item>  
      </Menu> 
    </Header>
  );
}
export default Header;
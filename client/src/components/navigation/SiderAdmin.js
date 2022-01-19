import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';

import {Link } from 'react-router-dom'
import {Layout, Menu} from 'antd';
import {PlusOutlined, HomeOutlined,LogoutOutlined} from '@ant-design/icons';
import { UserContext } from '../../Context';


const {Sider} = Layout;
const {SubMenu} = Menu;


function SiderAdmin() {
  
  const [collapsed, SetCollapsed] = useState(true)
  const {cycleId} = useContext(UserContext)
  
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

          <Menu.Item key="1" icon={<HomeOutlined style={{color:'white'}}/>}>
            <Link to={"/"} style={{color: 'white'}}>All Flights</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={  <PlusOutlined  style={{color:'white'}}/>}>
            <Link to={"/newFlight"} style={{color: 'white'}}>New Flight</Link>
          </Menu.Item>   
          <Menu.Item icon={<LogoutOutlined />} 
          style={{ width: 250}}
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


export default SiderAdmin;

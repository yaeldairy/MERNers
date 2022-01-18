import React, { useEffect, useState, useContext } from 'react';
import { Menu, message, Layout, Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined, MailOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { MenuItem } from '@mui/material';
import { UserContext } from "../Context";
import { Link } from 'react-router-dom';
import axios from 'axios';

// import {
//     DesktopOutlined,
//     PieChartOutlined,
//     FileOutlined,
//     TeamOutlined,
// } from '@ant-design/icons';

// const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;


export default function NavBar() {
    const [userData, setUserData] = useState([]);
    const { accessToken } = useContext(UserContext);
    // const [state, setState] = useState(false);


    const copyToClip = () => {
        navigator.clipboard.writeText('aclairlines@gmail.com')
        message.success('Email copied to clipboard', 1);
    };

    useEffect(() => {
        if (accessToken == null)
            return <></>;
        console.log("ACCESS " + accessToken)
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
    

    // const onCollapse = (collapsed) => {
    //     // console.log(collapsed);
    //     setState(collapsed);
    // };


    // const { collapsed } = state;
    // return (
    //     // <Layout style={{ minHeight: '100vh' }}>
    //         <Sider collapsible collapsed={state} onCollapse={onCollapse} style={{ minHeight: '100vh' }}>
    //             <div className="logo" />
    //             <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
    //                 <Menu.Item key="1" icon={<PieChartOutlined />}>
    //                     Option 1
    //                 </Menu.Item>
    //                 <Menu.Item key="2" icon={<DesktopOutlined />}>
    //                     Option 2
    //                 </Menu.Item>
    //                 <SubMenu key="sub1" icon={<UserOutlined />} title="User">
    //                     <Menu.Item key="3">Tom</Menu.Item>
    //                     <Menu.Item key="4">Bill</Menu.Item>
    //                     <Menu.Item key="5">Alex</Menu.Item>
    //                 </SubMenu>
    //                 <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
    //                     <Menu.Item key="6">Team 1</Menu.Item>
    //                     <Menu.Item key="8">Team 2</Menu.Item>
    //                 </SubMenu>
    //                 <Menu.Item key="9" icon={<FileOutlined />}>
    //                     Files
    //                 </Menu.Item>
    //             </Menu>
    //         </Sider>
    //     // </Layout> 
    // )

    return (
        <>
            {userData ? (
                // <Content style={{ padding: '0 50px' }}>
                //     <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                //         <Sider className="site-layout-background" width={200}>
                            <Menu
                                // onClick={this.handleClick}
                                style={{ width: 1500, display: "flex", flexDirection: "row", display: "flex" }}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                                theme="dark"
                            >

                                <MenuItem style={{ width: 250, marginLeft: '3%' }}><Link to={{ pathname: `/` }}><HomeOutlined />   Hello {userData.firstName} {userData.lastName}!</Link></MenuItem>
                                {/* <Menu icon={<UserOutlined />} title="Profile" style={{ }}> */}
                                <Menu.Item icon={<UserOutlined />} style={{ width: 250 }} >
                                    <Link to={{ pathname: `/profile` }} state={{ user: userData }}>
                                        Your Account
                                    </Link>
                                </Menu.Item>
                                <Menu.Item icon={<UnorderedListOutlined />} style={{ width: 250 }} >
                                    <Link to={{ pathname: `/bookings` }} state={{ user: userData }}>
                                        Bookings
                                    </Link>
                                </Menu.Item>
                                {/* </Menu> */}

                                <Menu.Item icon={<MailOutlined />} style={{ width: 250 }} onClick={copyToClip}>
                                    Contact Us
                                </Menu.Item>
                                <Menu.Item icon={<LogoutOutlined />} style={{ width: 250 }}>
                                    <Link to={{ pathname: `/` }}>
                                        Logout
                                    </Link>
                                </Menu.Item>


                            </Menu>
                //         </Sider>
                //     </Layout>
                // </Content>
            ) : (<></>)}
        </>
    );

}

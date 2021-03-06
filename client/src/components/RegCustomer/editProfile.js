import React, { useState, useEffect } from 'react'; //use effect is for renders
import { Form, Input, Button, message, Card, Divider, Typography } from 'antd';
import "antd/dist/antd.css";
// import moment from 'moment';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from "../../Context";

const { Title } = Typography;


//ba3d el edit eh?
export default function EditProfile() {
    let navigate = useNavigate();
    const { accessToken ,username} = useContext(UserContext);
    const location = useLocation();
    const { user } = location.state;
    const [userData, setUserData] = useState([user]);
    // console.log(userData[0].firstName);
    const [form] = Form.useForm();
    function handler(event) {

        setUserData({
            ...userData, //keeps rest as is
            [event.target.name]: event.target.value
        });

    }

    // const prefixSelector = (
    //     <Form.Item name="prefix" noStyle>
    //         <Select
    //             style={{
    //                 width: 70,
    //             }}
    //         >
    //             <Option value="86">+86</Option>
    //             <Option value="87">+87</Option>
    //         </Select>
    //     </Form.Item>
    // );

    //TODO fix the .then and .catch bodies
    async function onFinish() {
        const hide = message.loading('Updating Your Profile...', 0)
        // console.log(accessToken)

        try{
            const edit = await axios({
                method: 'patch', //should be patch
                url: 'http://localhost:3001/user/updateProfile',
                headers: { Authorization: `Bearer ${accessToken}` },
                data:{...userData, username }
            });
            hide()
            message.success('Data updated successfully. Redirecting...', 4)
            navigate('/');

        }
        catch(e){
            console.log(e)
            hide()
            message.error('Unable to connect to the server. Please try again later.');

        }
        // axios.patch('http://localhost:3001/user/updateProfile', {
        //     headers: { Authorization: `Bearer ${accessToken}` },
        //     data: userData
        // })
        //     .then((res) => {
        //         hide()
        //         message.success('Data updated successfully. Redirecting...', 4)
        //         
        //     })
        //     .catch((err) => {
        //         hide()
        //         message.error('Unable to connect to the server. Please try again later.');
        //     })
        //go back and update profile
    };


    function onFinishFailed() {
        message.error('Please review input');
    }

    return (
        <div>
            
            <Divider className="title-divider" />
            <Card title={<Title level={3}>Edit Profile</Title>} style={{ marginLeft: '10%', marginRight: '10%' }}>
                <Form
                    initialValues={{
                        firstnameInput: userData[0].firstName,
                        lastnameInput: userData[0].lastName,
                        emailInput: userData[0].email,
                        addressInput: userData[0].homeAddress,
                        countrycodeInput: userData[0].countryCode,
                        telephonenumberInput: userData[0].phoneNumber,
                        telephonenumber2Input: userData[0].phoneNumber2,
                        passportnumberInput: userData[0].passportNumber
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >

                    <Form.Item name='firstnameInput' label='First Name'
                        rules={[{ required: true, message: 'Please enter your first name!' }, { whitespace: true }]}>
                        <Input name='firstName'
                            onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='lastnameInput' label='Last Name'
                        rules={[{ required: true, message: 'Please enter your last name!' }, { whitespace: true }]}>
                        <Input name='lastName'
                            onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='emailInput' label='E-mail'
                        rules={[{ required: true, message: 'Please enter a valid email address!' }, { whitespace: true }, [{ type: 'email' }]]}>
                        <Input name='email'
                            onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='addressInput' label='Home Address'
                        rules={[{ required: true, message: 'Please enter your home address!' }, { whitespace: true }]}>
                        <Input name='homeAddress'
                            onChange={event => handler(event)} />
                    </Form.Item>

                    {/* <Form.Item name = "addressInput" label="Address">
                        <Input.Group compact>
                            <Form.Item
                                name={['address', 'province']}
                                noStyle
                                rules={[{ required: true, message: 'Province is required' }]}
                            >
                                <Select placeholder="Select province">
                                    <Option value="Zhejiang">Zhejiang</Option>
                                    <Option value="Jiangsu">Jiangsu</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['address', 'street']}
                                noStyle
                                rules={[{ required: true, message: 'Street is required' }]}
                            >
                                <Input style={{ width: '50%' }} placeholder="Input street" /> //edit fel schema?
                            </Form.Item>
                        </Input.Group>
                    </Form.Item> */}

                    <Form.Item name='countrycodeInput' label='Country Code'
                        rules={[{ required: true, message: 'Please enter a valid country code!' }, { whitespace: true }]}>
                        <Input name='countryCode'
                            onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='telephonenumberInput' label='Primary Phone Number'
                        rules={[{ required: true, message: 'Please input your phone number!' }, { whitespace: true }, { pattern: /^(?:\d*)$/, message: 'Phone number must be a number!' }]}>
                        <Input name='phoneNumber'
                            onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='telephonenumber2Input' label='Secondary Phone Number'
                        rules={[{ pattern: /^(?:\d*)$/, message: 'Phone number must be a number!' }]}>
                        <Input name='phoneNumber2' onChange={event => handler(event)} />
                    </Form.Item>

                    {/* <Form.Item
                        name="telephonenumberInput"
                        label="Telephone Number"
                        rules={[{ required: true, message: 'Please enter your phone number!' }, { whitespace: true }, { type: 'number', min: 1111111111, max: 9999999999 }]}
                    >
                        <Input name='telephonenumber'
                            onChange={event => telephoneHandler(event)} addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item> */}

                    <Form.Item name='passportnumberInput' label='Passport Number'
                        rules={[{ required: true, message: 'Please enter your passport number!' }, { whitespace: true }]}>
                        <Input name='passportNumber'
                            onChange={event => handler(event)} />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form>
            </Card>
        </div>
    )

}


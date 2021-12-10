import React, { useEffect, useState } from 'react';
import { Typography, Card, Form, Input, Button, message } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import axios from 'axios';
const { Title, Text } = Typography;
export default function UserSignup() {

    //const [value, functiontoupdatevalue] = useState(initialvalue) 
    //We deconstruct array                   //this returns an array

    const [userData, setuserData] = useState({
        username:"",
        password:"",
        fName: "",
        lName: "",
        homeAddress: "",
        cCode: "",
        phoneNum: "",
        phoneNum2: "",
        email: "",
        passportNum: "",


    })

    const [form] = Form.useForm();

    function handler(event) {

        setuserData({
            ...userData, //keeps rest as is
            [event.target.name]: event.target.value
        });

    }


    
    function onFinish() {
        const hide = message.loading('Submitting...', 0)
        axios.post('http://localhost:3001/signup', userData)
            .then((res) => {
                hide()
                form.resetFields();
                // console.log(res) 
                message.success('Sign up complete. Redirecting...', 2)
                    .then(function () {
                        window.location.href = '/'
                    }
                    )

            })
            .catch((err) => {
                hide()
                message.error('Unable to connect to the server. Please try again later.');
                // console.log(err)
            })
    }
    function onFinishFailed() {
        message.error('Please review input');
    }

    const title = (<Title level={2} >Sign up</Title>)

    return (
        <div>
            <Card title={title} style={{ marginLeft: '15%', marginRight: '15%', marginTop: '5%' }}    >
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    <Form.Item name='usernameInput' label='Username'
                        rules={[{ required: true, message: 'Please input your username!' }, { whitespace: true }]}>
                        <Input name='username' onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name="passwordInput" label="Password"
                        rules={[{required: true, message: 'Please input your password!'},]}hasFeedback>
                        <Input.Password name='password' onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback
                        rules={[{required: true, message: 'Please confirm your password!'},
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('passwordInput') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Please make sure your passwords match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name='fNameInput' label='First Name'
                        rules={[{ required: true, message: 'Please input your first name!' }, { whitespace: true }]}>
                        <Input name='fName' onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='lNameInput' label='Last Name'
                        rules={[{ required: true, message: 'Please input your last name!' }, { whitespace: true }]}>
                        <Input name='lName' onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='homeAddressInput' label='Home Address'
                        rules={[{ required: true, message: 'Please input your home address!' }, { whitespace: true }]}>
                        <Input name='homeAddress' onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='cCodeInput' label='Country Code'
                        rules={[{ required: true, message: 'Please input your country code!' }, { whitespace: true }]}>
                        <Input name='cCode' onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='phoneNumInput' label='Primary Phone Number'
                        rules={[{ required: true, message: 'Please input your phone number!' }, { whitespace: true }, { pattern: /^(?:\d*)$/, message: 'Phone number must be a number!' }]}>
                        <Input name='phoneNum' onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='phoneNum2Input' label='Additional Phone Number'
                        rules={[{ pattern: /^(?:\d*)$/, message: 'Phone number must be a number!' }]}>
                        <Input name='phoneNum2' onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='emailInput' label='Email'
                        rules={[{ required: true, message: 'Please input your Email!' }, { whitespace: true }, {type : 'email', message: 'Please input a valid Email address'}]}>
                        <Input name='email' onChange={event => handler(event)} />
                    </Form.Item>

                    <Form.Item name='passportNumInput' label='Passport Number'
                        rules={[{ required: true, message: 'Please input your passport number!' }, { whitespace: true }]}>
                        <Input name='passportNum' onChange={event => handler(event)} />
                    </Form.Item>



                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form>
            </Card>

        </div>
    )



}

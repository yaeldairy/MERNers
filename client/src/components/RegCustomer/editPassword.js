import React, { useState } from 'react'; //use effect is for renders
import { Form, Input, Button, message, Card, Divider, Typography, Select } from 'antd';
import "antd/dist/antd.css";
// import moment from 'moment';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const { Title } = Typography;
const { Option } = Select;


//ba3d el edit eh?
export default function EditPassword() {
    const location = useLocation();
    const { user } = location.state;
    const [userData, setUserData] = useState(user);

    const [form] = Form.useForm();

    function handler(event) {

        setUserData({
            ...userData, //keeps rest as is
            [event.target.name]: event.target.value
        });

    }


    //TODO fix the .then and .catch bodies
    function onFinish() {
        const hide = message.loading('Updating Your Password...', 0)
        axios.patch('http://localhost:3001/user/updateProfile', userData)
            .then((res) => {
                hide()
                message.success('Password updated successfully. Redirecting...', 2)
            })
            .catch((err) => {
                hide()
                message.error('Unable to connect to the server. Please try again later.');
            })
    };


    function onFinishFailed() {
        message.error('Please review input');
    }

    return (
        <div>
            <Divider className="title-divider" />
            <Card title={<Title level={3}>Edit Profile</Title>} style={{ marginLeft: '10%', marginRight: '10%' }}>
                <Form
                    // initialValues={{
                    //     passwordInput: userData.password,
                    //     confirmpasswordInput: userData.password
                    // }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    <Form.Item
                        name="passwordInput"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmpasswordInput"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password name='password'
                            onChange={event => handler(event)}/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form>
            </Card>
        </div>
    )

}


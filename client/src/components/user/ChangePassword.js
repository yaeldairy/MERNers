import { Input,  message, Button, Form, Typography, Card , Spin, Alert} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {useState, useContext} from 'react';
import {UserContext} from "../../Context";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

export default function ChangePassword() {

    const [form] = Form.useForm();
    const { username, accessToken } = useContext(UserContext);
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState(false);
    let navigate = useNavigate();

    const onSubmit = async () => {

        setError(false)

        try {    
            const values = await form.validateFields();

            console.log(values)

            if (values.newPassword!=values.reNewPassword){
                setError("New password entries do not match")
                return;
            }

            setLoading(true)
            const flightOne = await axios({
                method: 'post', 
                url: 'http://localhost:3001/changePassword',
                headers: { Authorization: `Bearer ${accessToken}` },
                data: { 
                    username: username.replaceAll('"', ''),
                    oldPassword : values.oldPassword,
                    newPassword : values.newPassword
                 }
              });    
         message.success('Password changed successfully');
         navigate('/profile')

        } catch (e) {
        
         setError("Wrong password")  
         message.error('Ops, something went wrong');       
        }
        setLoading(false)
      };

    return (

        <Spin spinning={loading} delay={400} >
        <Card 
        type="inner"
        title={<Title level={3} >Change Password</Title>}
        style={{marginLeft: '15%', marginRight: '15%', marginTop:'5%'}}>
    
        <Form form={form} name="New Activity">

             <Form.Item 
                name="oldPassword"
                label="Please enter old password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter old password',
                  },
                ]}>
                <Input.Password
                placeholder="input password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item 
                name="newPassword"
                label="Please enter new Password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter new password',
                  },
                ]}>
               <Input.Password
               placeholder="input password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              </Form.Item>
              <Form.Item 
                name="reNewPassword"
                label=" please re-enter new Password"
                rules={[
                  {
                    required: true,
                    message: 'Please re enter new password',
                  },
                ]}>
              <Input.Password
              placeholder="input password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
             />
              </Form.Item>
      {error && <Alert message={error} type="error" />} 
      <Button type="primary" onClick={onSubmit} style={{marginTop:'30px'}} >
                   Change Password
      </Button>

    </Form>
    </Card>
    </Spin>

    )

}
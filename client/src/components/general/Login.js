import 'antd/dist/antd.css';
import {useState, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { Divider , Space } from 'antd';
import { SyncOutlined , EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import {UserContext} from "../../Context";
import NavBar from '../NavBar';
import {
    Spin,
    Typography,
    DatePicker,
    Form,
    Card,
    Button,
    Alert,
    Input
  } from 'antd';
const { Title } = Typography;
const {TextArea} = Input;

function Login (){

    let navigate = useNavigate();
    const location = useLocation();
    let path = null;
    if(location.state){
      path=location.state.path;
    }
    const {setAccessToken, setPermissionLevel,setUsername} = useContext(UserContext);
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState(false);
    const [success, setSuccess]= useState(false);
    const [form] = Form.useForm();

    const onSubmit = async () => {
       
        try {

          const values = await form.validateFields();  
          setError(null)
          setLoading(true);
          console.log('Success:', values);
          const response = await axios({
            method: 'post',
            url: 'http://localhost:3001/login',
            data : { 
             username: values.username,
             password : values.password
            }
           
          });
          console.log(response.data)
          setAccessToken(response.data.accessToken)
          setPermissionLevel(response.data.permissionLevel)
          setUsername(response.data.username)
          localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
          localStorage.setItem("username", JSON.stringify(response.data.username));/////
          localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
          setSuccess(true)
          setError("Login successfull")
          setLoading(false)

        } catch (e) {
          
          setLoading(false)
          if (e.errorFields)
            setError("Please fill all input fields")
          else
            setError("Oops, There seems to be a network problem, please try again :/")
          console.log('Failed:', e);
        }
      };

    if (success){
      path ? navigate(path) : navigate("/") 
    }


    return (
        <div >
        
        <Spin spinning={loading} delay={400} >
              <Card title={<Title level={3} >Login</Title> }  
                    style={{marginLeft: '15%', marginRight: '15%', marginTop:'5%'}}>
                      
              <Form form={form} name="New Activity">
               
              <Form.Item 
                name="username"
                label="username"
                rules={[
                  {
                    required: true,
                    message: 'Please enter username',
                  },
                ]}>
                <TextArea placeholder="Username:" allowClear/>
              </Form.Item>
              <Form.Item 
                name="password"
                label="password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter password',
                  },
                ]}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                >
                <TextArea placeholder="Password:" allowClear/>
              </Form.Item>
                
              {error && <Alert message={error} type="error" />} 
  
              <Button type="primary" onClick={onSubmit}  >
                   Login
              </Button>
              </Form>
              </Card>
              </Spin>
      </div>
      );
}
export default Login;
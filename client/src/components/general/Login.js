import 'antd/dist/antd.css';
import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from 'axios';
import { Divider } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone,  UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserContext } from "../../Context";
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
const { TextArea } = Input;

function Login() {

 
  let navigate = useNavigate();
  const location = useLocation();
  let path = null;
  if (location.state) {
    path = location.state.path;
  }
  const { accessToken, setAccessToken, setPermissionLevel, setUsername } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    setAccessToken(null)
    setPermissionLevel(null)
    localStorage.clear();
  },[])

  const onSubmit = async () => {

    try {

      const values = await form.validateFields();
      setError(null)
      setLoading(true);
      console.log('Success:', values);
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: {
          username: values.username,
          password: values.password
        }

      });
      console.log(response.data)
      setAccessToken(response.data.accessToken)
      setPermissionLevel(response.data.permissionLevel)
      setUsername(response.data.username)
      localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
      localStorage.setItem("username", JSON.stringify(response.data.username));
      localStorage.setItem("permissionLevel", JSON.stringify(response.data.permissionLevel));/////
      localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
      setSuccess(true)
      setError("Login successfull")
      setLoading(false)

    } catch (e) {
      setLoading(false)
      // console.log("error");
      // console.log()
      if (e.errorFields)
        setError("Please fill all input fields")
      else if (e.response.data.errors)
        setError(e.response.data.errors);
      else
        setError("Oops, There seems to be a network problem, please try again :/")
      console.log('Failed:', e);
    }
  };

  if (success) {
    path ? navigate(path) : navigate("/")
  }


  return (
    <div >

      <Spin spinning={loading} delay={400} >
        <Card title={<Title level={3} >Login</Title>}
          type='inner'
          style={{ marginLeft: '15%', marginRight: '15%', marginTop: '5%' }}>

          <Form form={form} name="normal_login"
      className="login-form">

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please enter username',
                },
              ]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" allowClear />
              {/* <TextArea placeholder="Username:" allowClear /> */}
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please enter password',
                },
              ]}>
              {/* <TextArea placeholder="Password:" allowClear/> */}
              <Input.Password
                 prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                allowClear
              // onKeyDown={(e)=>{if (e.key === 'Enter') {onSubmit}}}
              />
            </Form.Item>

            {error && <Alert message={error} type="error" />}

            <Button type="primary" onClick={onSubmit} style={{marginTop:'30px', marginBottom:'30px'}}>
              Login
            </Button>
            <h4>
            Dont have an account? 
               {/* href="http://localhost:3000/signup"> */}<Link to = {{ pathname: `/signup` }}>Register now!</Link>
            </h4>
             
          </Form>
        </Card>
      </Spin>
    </div>
  );
}
export default Login;
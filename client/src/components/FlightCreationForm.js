import React, { useEffect, useState,  useContext } from 'react'; 
import { useNavigate, useLocation, Link } from "react-router-dom";
import {Typography, Card, Form, Input, Button, DatePicker, TimePicker, message } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import axios from 'axios';
import { UserContext } from "../Context";
import Unauthorized from './response/Unauthorized';
const { Title } = Typography;
export default function FlightCreationForm (){
    
    let navigate = useNavigate();
    const { permissionLevel, accessToken} = useContext(UserContext);
   
 
  
    const [flightData, setFlightData] = useState({
        flightNum: "",
        deptAirport: "", 
        arrAirport: "",
        deptTime: "",
        arrTime: "",
        duration: "",
        date: "",
        arrDate: "",
        nOfEconomy: 0,
        nOfBusiness: 0,
        nOfFirst: 0,
        price:0,
        takenSeats: [],
        remainingSeats: []
    })
    
    const [form] = Form.useForm();

    function handler (event){
       
        setFlightData({
           ...flightData, //keeps rest as is
           [event.target.name] : event.target.value 
       });
    
    }

    function onChangeDateHandler (event, name){
        setFlightData({
            ...flightData, //keeps rest as is
            [name] : moment(event).format('DD-MM-YYYY') //the date is in event and not event.target.value
        });
    }

    function onChangeTimeHandler (event, name){
        setFlightData({
            ...flightData, //keeps rest as is
            [name] : moment(event).format('HH:mm')
        });
    }

    useEffect(()=>{
        console.log(permissionLevel)
        
    },[])
    useEffect(() => {
        console.log(permissionLevel)
        let departureTime  = flightData.date + ' ' + flightData.deptTime;
        let arrivalTime = flightData.arrDate + ' ' + flightData.arrTime;
        let flightDuration = moment.utc(moment(arrivalTime,"DD/MM/YYYY HH:mm").diff(moment(departureTime,"DD/MM/YYYY HH:mm"))).format("HH:mm")
        setFlightData({
            ...flightData, //keeps rest as is
            'duration' : flightDuration,
            'remainingSeats' : [flightData.nOfEconomy, flightData.nOfBusiness, flightData.nOfFirst]
        });
    }, [flightData.date, flightData.deptTime, flightData.arrDate, flightData.arrTime, flightData.nOfEconomy, flightData.nOfBusiness, flightData.nOfFirst])
    
 
    
    //TODO fix the .then and .catch bodies
    function onFinish (){
        const hide = message.loading('Creating Flight...',0)
        console.log(flightData)
       
        axios({
            method: 'post', //should be patch
            url: 'http://localhost:3001/admin/flights',
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { flightData }
        })
        .then((res)=>{
                hide()
                form.resetFields();
                // console.log(res) 
                message.success('Flight added successfully. Redirecting...', 2)
                .then(function () {
                    navigate('/')
                }
                )
                 
            })
            .catch((err) =>{
                hide()
                message.error ('Unable to connect to the server. Please try again later.');
                // console.log(err)
            })
    }
    function onFinishFailed (){
        message.error ('Please review input');
    }

    if(permissionLevel==2){
        return <Unauthorized/>
    }
    
    const title=(<Title  level={2} >Create New Flight</Title> )

      return (
        <div>
    <Card title={title}  style={{marginLeft: '15%', marginRight: '15%', marginTop:'5%'}}    >
        <Form
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         form = {form}
         > 
            <Form.Item name='flightNumInput' label = 'Flight Number' 
            rules={[{ required: true, message: 'Please input a flight number!' }, {whitespace:true}]}>
                <Input name='flightNum' onChange ={event => handler(event)}/>
            </Form.Item>

            <Form.Item name='deptAirportInput' label = 'Departure Airport' 
            rules={[{ required: true, message: 'Please input the departure airport!'}, {whitespace:true}]}>
                <Input name='deptAirport' onChange ={event => handler(event)}/>
            </Form.Item>

            <Form.Item name='arrAirportInput' label = 'Arrival Airport' 
            rules={[{ required: true, message: 'Please input the arrival airport!'}, {whitespace:true}]}>
                <Input name='arrAirport'  onChange ={event => handler(event)}/>
            </Form.Item>
            
            <Form.Item name='deptTime' label = 'Departure Time' rules={[{ required: true, message: 'Please select the departure time!' }]}>
                <TimePicker showNow={false} style ={{width:'100%'}} format = {'HH:mm'} onChange ={event => onChangeTimeHandler(event, 'deptTime')}/>
            </Form.Item>
            
            <Form.Item name='arrTime' label = 'Arrival Time' rules={[{ required: true, message: 'Please select the arrival time!' }]}>
                <TimePicker showNow={false} style ={{width:'100%'}}  format = {'HH:mm'} onChange ={event => onChangeTimeHandler(event, 'arrTime')}/>
            </Form.Item>
            
            <Form.Item name='date' label = 'Departure Date' rules={[{ required: true, message: 'Please select the departure date!' }]}>
                <DatePicker  style ={{width:'100%'}} format = 'DD-MM-YYYY' picker = 'date' onChange ={event => onChangeDateHandler(event, 'date')}/>
            </Form.Item>

            <Form.Item name='arrDate' label = 'Arrival Date' rules={[{ required: true, message: 'Please select the arrival date!' }]}>
                <DatePicker  style ={{width:'100%'}} format = 'DD-MM-YYYY' picker = 'date' onChange ={event => onChangeDateHandler(event, 'arrDate')}/>
            </Form.Item>

            <Form.Item name='nOfEconomyInput' label = 'Number of Economy Class Seats'
              rules={[{ required: true, message: 'Please input the number of economy class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Seat count must be a number!'}]}>
                <Input name='nOfEconomy' onChange ={event => handler(event)}/>
            </Form.Item>

             <Form.Item name='nOfBusinessInput' label = 'Number of Business Class Seats'
              rules={[{ required: true, message: 'Please input the number of business class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Seat count must be a number!'}]}>
                <Input name='nOfBusiness' onChange ={event => handler(event)}/>
            </Form.Item>

            <Form.Item name='nOfFirstInput' label = 'Number of First Class Seats'
              rules={[{ required: true, message: 'Please input the number of first class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Seat count must be a number!'}]}>
                <Input name='nOfFirst' onChange ={event => handler(event)}/>
            </Form.Item>
            
            <Form.Item name='priceInput' label = 'Base Price'
              rules={[{ required: true, message: 'Please input the base price of a seat!'}, {whitespace:true}, {pattern: /^\d+(\.\d{1,2})?$/, message: 'Price must be a number with at-most two decimal places!'}]}>
                <Input name='price' onChange ={event => handler(event)}/>
            </Form.Item>

            <Button type="primary" htmlType="submit">
          Create
        </Button>
        </Form>
        </Card> 

        </div>
      )

    
     
}

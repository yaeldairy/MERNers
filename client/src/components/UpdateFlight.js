import React, { useState, useEffect } from 'react'; //use effect is for renders
import { Form, Input, Button, DatePicker, TimePicker, message, Card, Divider, Typography} from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const {Title} = Typography;



export default function UpdateFlight(){
    const location = useLocation();
    const { flight } = location.state;
    const [flightData, setFlightData] = useState(flight);

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
    useEffect(() => {
        let departureTime  = flightData.date + ' ' + flightData.deptTime;
        let arrivalTime = flightData.arrDate + ' ' + flightData.arrTime;
        let flightDuration = moment.utc(moment(arrivalTime,"DD/MM/YYYY HH:mm").diff(moment(departureTime,"DD/MM/YYYY HH:mm"))).format("HH:mm")
        setFlightData({
            ...flightData, //keeps rest as is
            'duration' : flightDuration
        });
    }, [flightData.date, flightData.deptTime, flightData.arrDate, flightData.arrTime])
    
    //TODO fix the .then and .catch bodies
    function onFinish (){
        const hide = message.loading('Updating Flight...',0)
        axios.patch('http://localhost:3001/admin/updateFlight', flightData)
            .then((res)=>{
                hide()
                form.resetFields();
                // console.log(res)
                message.success('Fligh updated successfully. Redirecting...', 2)
                .then(function () {
                    window.location.href='/' 
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
    
      return (
        <div>
            <Divider className="title-divider"/>
        <Card title={<Title level={3}>Flight Number {flightData.flightNum}</Title>} style={{marginLeft: '10%', marginRight: '10%'}}>
        <Form
        initialValues={{
            deptAirportInput: flightData.deptAirport,
            arrAirportInput: flightData.arrAirport,
            deptTime: moment(flightData.deptTime, 'HH:mm'),
            arrTime: moment(flightData.arrTime, 'HH:mm'),
            date: moment(flightData.date, 'DD-MM-YYYY'),
            arrDate: moment(flightData.arrDate, 'DD-MM-YYYY'),
            nOfEconomyInput: flightData.nOfEconomy.toString(),
            nOfBusinessInput: flightData.nOfBusiness.toString(),
            nOfFirstInput: flightData.nOfFirst.toString(),
            priceInput:flightData.price.toString()
        }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         form = {form}
         > 

            <Form.Item name='deptAirportInput' label = 'Departure Airport' 
            rules={[{ required: true, message: 'Please input the departure airport!'}, {whitespace:true}]}>
                <Input name='deptAirport' 
                onChange ={event => handler(event)}/>
            </Form.Item>

            <Form.Item name='arrAirportInput' label = 'Arrival Airport' 
            rules={[{ required: true, message: 'Please input the arrival airport!'}, {whitespace:true}]}>
                <Input name='arrAirport' 
                 onChange ={event => handler(event)}/>
            </Form.Item>
            
            <Form.Item name='deptTime' label = 'Departure Time' rules={[{ required: true, message: 'Please select the departure time!' }]}>
                <TimePicker  
                showNow={false} style ={{width:'100%'}} format = {'HH:mm'} onChange ={event => onChangeTimeHandler(event, 'deptTime')}/>
            </Form.Item>
            
            <Form.Item name='arrTime' label = 'Arrival Time' rules={[{ required: true, message: 'Please select the arrival time!' }]}>
                <TimePicker 
                showNow={false} style ={{width:'100%'}}  format = {'HH:mm'} onChange ={event => onChangeTimeHandler(event, 'arrTime')}/>
            </Form.Item>
            
            <Form.Item name='date' label = 'Departure Date' rules={[{ required: true, message: 'Please select the departure date!' }]}>
                <DatePicker 
                style ={{width:'100%'}} format = 'DD-MM-YYYY' picker = 'date' onChange ={event => onChangeDateHandler(event, 'date')}/>
            </Form.Item>

            <Form.Item name='arrDate' label = 'Arrival Date' rules={[{ required: true, message: 'Please select the arrival date!' }]}>
                <DatePicker  style ={{width:'100%'}} format = 'DD-MM-YYYY' picker = 'date' onChange ={event => onChangeDateHandler(event, 'arrDate')}/>
            </Form.Item>

            <Form.Item name='nOfEconomyInput' label = 'Number of Economy Seats'
              rules={[{ required: true, message: 'Please input the number of business class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Please enter a seat count!'}]}>
                <Input name='nOfEconomy' onChange ={event => handler(event)}/>
            </Form.Item>

             <Form.Item name='nOfBusinessInput' label = 'Number of Business Seats' defaultValue = {flightData.nOfBusiness} 
              rules={[{ required: true, message: 'Please input the number of business class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Please enter a seat count!'}]}>
                <Input name='nOfBusiness' 
                onChange ={event => handler(event)}/>
            </Form.Item>
            
            <Form.Item name='nOfFirstInput' label = 'Number of First Class Seats' defaultValue = {flightData.nOfFirst}
              rules={[{ required: true, message: 'Please input the number of first class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Please enter a seat count!'}]}>
                <Input name='nOfFirst' onChange ={event => handler(event)}/>
            </Form.Item>
            
            <Form.Item name='priceInput' label = 'Base Price'
              rules={[{ required: true, message: 'Please input the base price of a seat!'}, {whitespace:true}, {pattern: /^\d+(\.\d{1,2})?$/, message: 'Price must be a number with at-most two decimal places!'}]}>
                <Input name='price' onChange ={event => handler(event)}/>
            </Form.Item>

            <Button type="primary" htmlType="submit">
                Update
        </Button>
        </Form>
           </Card>
        </div>
      )

    
     
}


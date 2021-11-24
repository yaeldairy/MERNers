import React, { useEffect, useState } from 'react'; //use effect is for renders
import { Form, Input, Button, DatePicker, Checkbox, TimePicker, message, InputNumber} from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import axios from 'axios';

export default function FlightCreationForm (){

    //const [value, functiontoupdatevalue] = useState(initialvalue) 
    //We deconstruct array                   //this returns an array
    
    let dateFormat = ''
    const [flightData, setFlightData] = useState({
        flightNum: "",
        deptAirport: "", 
        arrAirport: "",
        deptTime: "",
        arrTime: "",
        date: "",
        nOfEconomy: 0,
        nOfBusiness: 0,
    })

    function handler (event){
       
        setFlightData({
           ...flightData, //keeps rest as is
           [event.target.name] : event.target.value 
       });
    
    }

    function onChangeDateHandler (event, name){
        setFlightData({
            ...flightData, //keeps rest as is
            [name] : moment(event).format('MM-DD-YYYY') //the date is in event and not event.target.value
        });
    }

    function onChangeTimeHandler (event, name){
        setFlightData({
            ...flightData, //keeps rest as is
            [name] : moment(event).format('HH:mm')
        });
    }
    
 
    
    //TODO fix the .then and .catch bodies
    function onFinish (){
        axios.post('http://localhost:3001/admin/flights', flightData)
            .then((res)=>{
                console.log(res)   
            })
            .catch((err) =>{
                console.log(err)
            })
    }
    function onFinishFailed (){
        message.error ('Please review input');
    }
    
    // onClick = {event => sumbitHandler(event)}
    // useEffect (() => {
    //     console.log(moment(flightData.date).format('DD-MM-YYYY'));
    // });
    //moment(date).format('MM-DD-YYYY')
    //moment(arrTime).format('HH:mm')

      return (
        <div>
            
        <Form
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
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
            <Form.Item name='nOfEconomyInput' label = 'Number of Business Seats'
              rules={[{ required: true, message: 'Please input the number of business class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Please enter a seat count!'}]}>
                <Input name='nOfEconomy' onChange ={event => handler(event)}/>
            </Form.Item>

             <Form.Item name='nOfBusinessInput' label = 'Number of Business Seats'
              rules={[{ required: true, message: 'Please input the number of business class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Please enter a seat count!'}]}>
                <Input name='nOfBusiness' onChange ={event => handler(event)}/>
            </Form.Item>

            <Button type="primary" htmlType="submit">
          Create
        </Button>
        </Form>
           
        </div>
      )

    
     
}

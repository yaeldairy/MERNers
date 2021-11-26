import React, { useState } from 'react'; //use effect is for renders
import { Form, Input, Button, DatePicker, TimePicker, message, Card, Divider, Typography} from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
const {Title} = Typography;



export default function UpdateFlight(){
    const location = useLocation();
    const { flight } = location.state;
    const [flightData, setFlightData] = useState(flight);
  
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
        console.log("finished");
        axios.patch('http://localhost:3001/admin/updateFlight', flightData)
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
            nOfEconomyInput: flightData.nOfEconomy.toString(),
            nOfBusinessInput: flightData.nOfBusiness.toString()
        }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
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
            <Form.Item name='nOfEconomyInput' label = 'Number of Business Seats'
              rules={[{ required: true, message: 'Please input the number of business class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Please enter a seat count!'}]}>
                <Input name='nOfEconomy' onChange ={event => handler(event)}/>
            </Form.Item>

             <Form.Item name='nOfBusinessInput' label = 'Number of Business Seats' defaultValue = {flightData.nOfBusiness} 
              rules={[{ required: true, message: 'Please input the number of business class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Please enter a seat count!'}]}>
                <Input name='nOfBusiness' 
                onChange ={event => handler(event)}/>
            </Form.Item>

            <Button type="primary" htmlType="submit">
            <Link to={{pathname:`/viewFlight/${flight.flightNum}`}} state={{ flight: flightData }}>
         Update
      </Link>
        </Button>
        </Form>
           </Card>
        </div>
      )

    
     
}


import React, { useState } from 'react'; //use effect is for renders
import { Form, Input, Button, DatePicker, TimePicker, message, Card, Divider, Typography} from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import axios from 'axios';
const {Title} = Typography;


export default function UpdateFlight(param){
    // const flight = {flightNum: "MS731",
    //     deptAirport: "CAI",
    //     arrAirport: "JFK",
    //     deptTime: "0920",
    //     arrTime: "2230",
    //     date: "12-5-2021",
    //     nOfEconomy: 2,
    //     nOfBusiness: 0};
    // const [form] = Form.useForm();
    const flight = { "_id": "619a63adebef289aa49f0102",
    "flightNum": "A224",
    "deptAirport": "DXB",
    "arrAirport": "BER",
    "deptTime": "12:00",
    "arrTime": "15:45",
    "date": "14-10-2021",
    "nOfEconomy": "200",
    "nOfBusiness": "20",
    "__v": 0}
    //const [value, functiontoupdatevalue] = useState(initialvalue) 
    //We deconstruct array                   //this returns an array
    const [flightData, setFlightData] = useState(flight);
    //  form.setFieldsValue({
        
    //  });
    

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
            <Divider className="title-divider"/>
    <Card title={<Title level={3}>Flight Number {flightData.flightNum}</Title>} style={{marginLeft: '10%', marginRight: '10%'}}>
        <Form
        initialValues={{
            deptAirportInput: flightData.deptAirport,
            arrAirportInput: flightData.arrAirport,
            deptTime: moment(flightData.deptTime, 'HH:mm'),
            arrTime: moment(flightData.arrTime, 'HH:mm'),
            date: moment(flightData.date, 'DD-MM-YYYY'),
            nOfEconomyInput: flightData.nOfEconomy,
            nOfBusinessInput: flightData.nOfBusiness
        }}
        // form = {form}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         > 

            <Form.Item name='deptAirportInput' label = 'Departure Airport' 
            rules={[{ required: true, message: 'Please input the departure airport!'}, {whitespace:true}]}>
                <Input name='deptAirport' 
                // defaultValue = {flightData.deptAirport} 
                onChange ={event => handler(event)}/>
            </Form.Item>

            <Form.Item name='arrAirportInput' label = 'Arrival Airport' 
            rules={[{ required: true, message: 'Please input the arrival airport!'}, {whitespace:true}]}>
                <Input name='arrAirport' 
                // defaultValue = {flightData.arrAirport}
                 onChange ={event => handler(event)}/>
            </Form.Item>
            
            <Form.Item name='deptTime' label = 'Departure Time' rules={[{ required: true, message: 'Please select the departure time!' }]}>
                <TimePicker  
                // defaultValue={moment(flightData.deptTime, 'HH:mm')} 
                showNow={false} style ={{width:'100%'}} format = {'HH:mm'} onChange ={event => onChangeTimeHandler(event, 'deptTime')}/>
            </Form.Item>
            
            <Form.Item name='arrTime' label = 'Arrival Time' rules={[{ required: true, message: 'Please select the arrival time!' }]}>
                <TimePicker 
                // defaultValue={moment(flightData.arrTime, 'HH:mm')} 
                showNow={false} style ={{width:'100%'}}  format = {'HH:mm'} onChange ={event => onChangeTimeHandler(event, 'arrTime')}/>
            </Form.Item>
            
            <Form.Item name='date' label = 'Departure Date' rules={[{ required: true, message: 'Please select the departure date!' }]}>
                <DatePicker 
                // defaultValue={moment(flightData.date, 'DD-MM-YYYY')} 
                style ={{width:'100%'}} format = 'DD-MM-YYYY' picker = 'date' onChange ={event => onChangeDateHandler(event, 'date')}/>
            </Form.Item>
            <Form.Item name='nOfEconomyInput' label = 'Number of Business Seats'
              rules={[{ required: true, message: 'Please input the number of business class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Please enter a seat count!'}]}>
                <Input name='nOfEconomy' 
                // defaultValue = {flightData.nOfEconomy} 
                onChange ={event => handler(event)}/>
            </Form.Item>

             <Form.Item name='nOfBusinessInput' label = 'Number of Business Seats' defaultValue = {flightData.nOfBusiness} 
              rules={[{ required: true, message: 'Please input the number of business class seats!'}, {whitespace:true}, {pattern: /^(?:\d*)$/, message: 'Please enter a seat count!'}]}>
                <Input name='nOfBusiness' 
                // defaultValue = {flightData.nOfBusiness} 
                onChange ={event => handler(event)}/>
            </Form.Item>

            <Button type="primary" htmlType="submit">
          Update
        </Button>
        </Form>
           </Card>
        </div>
      )

    
     
}


import React, { useState } from 'react'; //use effect is for renders
import { Form, Input, Button, DatePicker, TimePicker} from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';

export default function SearchForm ({handleOk}){

    //const [value, functiontoupdatevalue] = useState(initialvalue) 
    //We deconstruct array                   //this returns an array
    
    const [flightData, setFlightData] = useState({
        flightNum: "",
        deptAirport: "", 
        arrAirport: "",
        deptTime: "",
        arrTime: "",
        date: "",
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
    function sumbitHandler(event){
        // console.log("flight data")
        // console.log(flightData);
        handleOk(flightData)
      
    }

      return (
        <div>
            
        <Form> 
            <Form.Item name='flightNumInput' label = 'Flight Number' 
            rules={[{whitespace:true}]}>
                <Input name='flightNum' onChange ={event => handler(event)}/>
            </Form.Item>

            <Form.Item name='deptAirportInput' label = 'Departure Airport' 
            rules={[{whitespace:true}]}>
                <Input name='deptAirport' onChange ={event => handler(event)}/>
            </Form.Item>

            <Form.Item name='arrAirportInput' label = 'Arrival Airport' 
            rules={[{whitespace:true}]}>
                <Input name='arrAirport'  onChange ={event => handler(event)}/>
            </Form.Item>
            
            <Form.Item name='deptTime' label = 'Departure Time' rules={[]}>
                <TimePicker style ={{width:'100%'}} format = {'HH:mm'} onChange ={event => onChangeTimeHandler(event, 'deptTime')}/>
            </Form.Item>
            
            <Form.Item name='arrTime' label = 'Arrival Time' rules={[]}>
                <TimePicker style ={{width:'100%'}}  format = {'HH:mm'} onChange ={event => onChangeTimeHandler(event, 'arrTime')}/>
            </Form.Item>
            
            <Form.Item name='date' label = 'Departure Date' rules={[]}>
                <DatePicker  style ={{width:'100%'}} format = 'DD-MM-YYYY' picker = 'date' onChange ={event => onChangeDateHandler(event, 'date')}/>
            </Form.Item>
        <div style={{textAlign:'center'}}>
            <Button type="primary"  htmlType="submit" onClick = {event => sumbitHandler(event)}>
            Search
           </Button>
        </div>
        </Form>
           
        </div>
      )

    
     
}


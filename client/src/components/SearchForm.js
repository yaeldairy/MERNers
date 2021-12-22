import React, { useState } from 'react'; //use effect is for renders
import { Form, Input, Button, DatePicker, TimePicker} from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';

export default function SearchForm ({handleOk}){

    const [flightData, setFlightData] = useState({
        arrAirport: "",
        arrTime: "",
        date: "",
        deptAirport: "",
        deptTime: "",
        flightNum: "",
        cabinClass:"",
        nOfSeats : "",
        nOfAdult : "",
        nOfChild : "",
        
        
    })

    const[nOfChild ,setnOfChild] = useState(0)
    const[nOfAdult,setnOfAdult] = useState(0)

    function handler (event){
       
        setFlightData({
           ...flightData, //keeps rest as is
           [event.target.name] : event.target.value 
       });
    
    }
    function updateChild(evt) {
        const a = parseInt(evt.target.value)
        setnOfChild(a);
        setFlightData({
            ...flightData, //keeps rest as is
            [evt.target.name] : a,
            ['nOfSeats']: nOfAdult + a
        });
        }

    function updateAdult(evt) {
        const a = parseInt(evt.target.value)
        setnOfAdult(a);
        setFlightData({
            ...flightData, //keeps rest as is
            [evt.target.name] : a,
            ['nOfSeats']: nOfChild + a
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
    
    //TODO fix the .then and .catch bodies
    function sumbitHandler(event){
        console.log(flightData)
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

            <Form.Item name='nOfChildInput' label = 'Number of Children'
            rules={[{whitespace:true}]}>
                <Input name='nOfChild' id='1' onChange ={event => updateChild(event)}/>
            </Form.Item>

            <Form.Item name='nOfAdultInput' label = 'Number of Adults'
            rules={[{whitespace:true}]}>
                <Input name='nOfAdult' id='2' onChange ={event => updateAdult(event)}/>
            </Form.Item>

            <Form.Item name='cabinClassInput' label = 'Cabin Class'
            rules={[{whitespace:true}]}>
                <Input name='cabinClass' onChange ={event => handler(event)}/>
            </Form.Item>
            
            <Form.Item name='deptTime' label = 'Departure Time' rules={[]}>
                <TimePicker style ={{width:'100%'}} format = {'HH:mm'} onChange ={event => onChangeTimeHandler(event, 'deptTime')}/>
            </Form.Item>
            
            <Form.Item name='arrTime' label = 'Arrival Time' rules={[]}>
                <TimePicker style ={{width:'100%'}}  format = {'HH:mm'} onChange ={event => onChangeTimeHandler(event, 'arrTime')}/>
            </Form.Item>
            
            <Form.Item name='deptDate' label = 'Departure Date' rules={[]}>
                <DatePicker  style ={{width:'100%'}} format = 'DD-MM-YYYY' picker = 'date' onChange ={event => onChangeDateHandler(event, 'date')}/>
            </Form.Item>

            <Form.Item name='arrDate' label = 'Arrival Date' rules={[]}>
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


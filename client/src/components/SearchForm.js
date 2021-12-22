import React, { useState } from 'react'; //use effect is for renders
import { Form, Input, Button, DatePicker, TimePicker, InputNumber,  Select} from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
const { Option } = Select;

export default function SearchForm ({handleOk}){

    //const [value, functiontoupdatevalue] = useState(initialvalue) 
    //We deconstruct array                   //this returns an array
    
    const [flightData, setFlightData] = useState({
        flightNum: "",
        deptAirport: "", 
        arrAirport: "",
        date: "",
        noOfAdults: 0,
        noOfChildren: 0,
        cabin: ""
    })

    function handler (event){
        console.log(flightData)
        console.log(event)
        setFlightData({
           ...flightData, //keeps rest as is
           [event.target.name] : event.target.value 
       });
    
    }
    function numberhandler (event, type){
        console.log(event)
        setFlightData({
            ...flightData, //keeps rest as is
            [type]: event
        }); 
    }
    function onSelectChange (event){
        console.log(event)
        setFlightData({
            ...flightData, //keeps rest as is
           cabin : event
        });
    }

    function onChangeDateHandler (event, name){
        console.log(event)
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
            <Form.Item name='date' label = 'Departure Date' rules={[]}>
                <DatePicker  style ={{width:'100%'}} format = 'DD-MM-YYYY' picker = 'date' onChange ={event => onChangeDateHandler(event, 'date')}/>
            </Form.Item>
            <Form.Item name="noOfAdults" label="Adults" >
             <InputNumber  onChange ={event => numberhandler(event,"noOfAdults")} min={1} />
          </Form.Item>
          <Form.Item  name="noOfChildren"  label="Children">
          <InputNumber   onChange ={event => numberhandler(event,"noOfChildren")} min={0} />
         </Form.Item>

          <Form.Item name='Cabin' label = 'Cabin Class' 
            rules={[{whitespace:true}]}>
        <Select
          showSearch
          placeholder="Select seat type"
          optionFilterProp="children"
          onChange={(value)=>{onSelectChange(value)}}
        >
         <Option value="First">First</Option>
         <Option value="Business">Business</Option>
         <Option value="Economy">Economy</Option>
       </Select>
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


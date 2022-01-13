import React, { useState } from 'react'; //use effect is for renders
import { Form, Input, Button, DatePicker, TimePicker, InputNumber,  Select} from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
const { Option } = Select;

export default function SearchAlternativeFlights ({handleOk}){
  
    const [flightData, setFlightData] = useState({

        date: "",
        cabin: ""
    })
  
    function onSelectChange (event){
        console.log(event)
        setFlightData({
            ...flightData, 
           cabin : event
        });
    }

    function onChangeDateHandler (event, name){
        console.log(event)
        setFlightData({
            ...flightData, 
            [name] : moment(event).format('DD-MM-YYYY') //the date is in event and not event.target.value
        });
    }

    
    
    function sumbitHandler(event){
       
        handleOk(flightData)
      
    }

      return (
        <div>
            
        <Form> 
            <Form.Item name='date' label = 'Departure Date' rules={[]}>
                <DatePicker  style ={{width:'100%'}} format = 'DD-MM-YYYY' picker = 'date' onChange ={event => onChangeDateHandler(event, 'date')}/>
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


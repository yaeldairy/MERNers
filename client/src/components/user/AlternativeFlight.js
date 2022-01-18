import { Button, Card, Typography, Popconfirm } from 'antd';
import {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import {FaPlaneDeparture} from "react-icons/fa"
import FlightInfo from './FlightInfo';
import ChangeCheckout from './ChangeCheckout';
import axios from 'axios';
import ChooseCabin from './ChooseCabin';
const { Title } = Typography;

function AlternativeFlight (){
   
    const location = useLocation();
    const { oldUserFlight, oldFlight, newFlight, pricediff, type } = location.state; // choose cabin
    console.log(oldUserFlight);
    console.log(oldFlight);
    console.log(newFlight);
    console.log(pricediff);
    console.log(type);
    const [bookingFlag, setBookingFlag] = useState(false);
    
   
    const onClick = ()=>{
      setBookingFlag(true);
    }
    useEffect(() => {
     
      }, []);

    const title= (<div style={{ display: "flex", flexDirection :'row'}}>
      <FaPlaneDeparture style={{ fontSize: '200%' }} />
      <Title level={3} style={{ marginLeft:'20px'}}>Flight: {newFlight.flightNum}</Title>
      </div>)

      

    return( 
        <div>
         <Card style={{ marginLeft:'10%' , marginRight:'10%', marginTop:'5%' }}>
        <Card
        style={{marginTop:'50px'}}    
        title={title}
        bordered={false}>
        <FlightInfo flight={newFlight} pricediff={pricediff}/>
        {/* <Button type="primary" > */}
        <ChooseCabin oldFlight = {oldFlight} oldUserFlight = {oldUserFlight} newFlight= {newFlight} type= {type} pricediff= {pricediff}/>
        
        {/* </Button> */}
        </Card>
        </Card>      
       </div>)

}
export default AlternativeFlight;
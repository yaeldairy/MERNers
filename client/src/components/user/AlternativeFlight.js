import { Button, Card, Typography, Popconfirm } from 'antd';
import {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import {FaPlaneDeparture} from "react-icons/fa"
import FlightInfo from './FlightInfo';
import ChangeCheckout from './ChangeCheckout';
import axios from 'axios';
const { Title } = Typography;

function AlternativeFlight (){
   
    const location = useLocation();
    const { oldUserFlight, oldFlight, newFlight, pricediff, type } = location.state; // choose cabin
    // console.log(oldFlight);
    const [bookingFlag, setBookingFlag] = useState(false);
    var cabin;
   
    const onClick = ()=>{
      setBookingFlag(true);
    }
    useEffect(() => {
     
      }, []);

    const title= (<div style={{ display: "flex", flexDirection :'row'}}>
      <FaPlaneDeparture style={{ fontSize: '200%' }} />
      <Title level={3} style={{ marginLeft:'20px'}}>Flight: {newFlight.flightNum}</Title>
      </div>)

      if (bookingFlag) { 
        return <ChangeCheckout oldFlight = {oldFlight} oldUserFlight = {oldUserFlight} newFlight= {newFlight} cabin = {cabin} type= {type} pricediff= {pricediff}/>//return
        //oldFlight, oldCabin, flight, cabin, type, booking, pricediff, noOfSeats, seat
        /* <Link to={{pathname:`/changeCheckout`}} state={{ flight: flight, type: type, booking: booking, pricediff: pricediff }}>
         Confirm alternative flight
        </Link> */
      }

    return( 
        <div>
         <Card style={{ marginLeft:'10%' , marginRight:'10%', marginTop:'5%' }}>
        <Card
        style={{marginTop:'50px'}}    
        title={title}
        bordered={false}>
        <FlightInfo flight={newFlight} pricediff={pricediff}/>
        <Button type="primary" >
        <Popconfirm
            title="Are you sure you want to book this flight?"
            onConfirm={onClick}

            okText="Yes"
            cancelText="No"
          >
            Book Flight
          </Popconfirm>
        
        </Button>
        </Card>
        </Card>      
       </div>)

}
export default AlternativeFlight;
import { Button, Card, Typography, Modal, Steps } from 'antd';
import {useState, useContext, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';
import {FaPlaneDeparture} from "react-icons/fa"
import FlightInfo from './FlightInfo';
import {UserContext} from "../../Context";
const { Title, Text } = Typography;
const { Step } = Steps;

function ReturnFlight (){
   
    const location = useLocation();
    const { flight, departureFlight } = location.state;
    const {setDepartureFlight, setReturnFlight } = useContext(UserContext);
   
    useEffect(() => {
      setDepartureFlight(departureFlight);
      setReturnFlight(flight);
     
      }, []);

    const title= (<div style={{ display: "flex", flexDirection :'row'}}>
      <FaPlaneDeparture style={{ fontSize: '200%' }} />
      <Title level={3} style={{ marginLeft:'20px'}}>Flight:  {flight.flightNum}</Title>
      </div>)

    return( 
        <div>
         <Card style={{ marginLeft:'10%' , marginRight:'10%', marginTop:'5%' }}>
        <Steps size="default" current={1}>
          <Step title="Departure Flight" />
          <Step title="Return Flight" />
          <Step title="Checkout" />
        </Steps>
        <Card
        style={{marginTop:'50px'}}    
        title={title}
        bordered={false}>
        <FlightInfo flight={flight}/>
        <Button type="primary" >
        <Link to={{pathname:`/checkout`}} state={{ returnFlight: flight, departureFlight}}>
         Proceed to Checkout
        </Link>
        </Button>
        </Card>
        </Card>      
       </div>)

}
export default ReturnFlight;
import { Button, Card, Typography, Modal, Select } from 'antd';
import {useState, useContext, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';
import {UserContext} from "../../Context";
import {FaPlaneDeparture} from "react-icons/fa"
import FlightInfo from './FlightInfo';
import ChooseSeats from './ChooseSeats';

const { Title, Text } = Typography;



function Flight (){

    const {permissionLevel} = useContext(UserContext);

    const location = useLocation();
    const { flight } = location.state;
   
    useEffect(() => {
      console.log(flight)
      }, []);

   

    const title= (<div style={{ display: "flex", flexDirection :'row'}}>
      <FaPlaneDeparture style={{ fontSize: '200%' }} />
      <Title level={3} style={{ marginLeft:'20px'}}>Flight:  {flight.flightNum}</Title>
      </div>)

    if (permissionLevel==1){
      return( <Button type="primary" >
                 Update
              </Button> )
    }
    return( 
        <div>
        <Card
        style={{ marginLeft:'10%' , marginRight:'10%', marginTop:'5%' }}    
        title={title}>

        <FlightInfo flight={flight}/>

       { permissionLevel==1 ?
       <Button type="primary" > Update</Button> :
       <ChooseSeats flight={flight} />
       }
        </Card>

         
       </div>)

}
export default Flight;
import React, { useEffect, useState , useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { List, Typography } from 'antd';
import FlightListItem from './FlightListItem';
import {Button, Modal, Card ,Tooltip,Steps} from 'antd';
import {UserContext} from "../../Context";
import {FaPlaneArrival, FaPlaneDeparture} from "react-icons/fa"
const { Step } = Steps;
const { Title } = Typography;

function ReturnFlights(){

    const location = useLocation();
    const { flight, seatType, Adults, Children } = location.state;
     const {flights, setFlights} = useContext(UserContext);
    const [returnFlights, setReturnFlights] =useState(null)
    const [displayed, setDisplayed] =useState(null)

     useEffect(()=>{

         const filteredFlights = flights.filter((f)=>{

            if(f.deptAirport!==flight.arrAirport || f.arrAirport!== flight.deptAirport){
                return false;
            }
            switch (seatType) {
                case "First":
                    if(f.nOfFirst<(Adults+Children)){
                      return false;
                    }
                break;     
                case "Economy":
                    if(f.nOfEconomy<(Adults+Children)){
                        return false;
                      }
                break;
                 
                case "Business":
                    if(f.nOfBusiness<(Adults+Children)){
                        return false;
                      }
                break;   
              }
              return true;
         })
         console.log(filteredFlights)
         setDisplayed(filteredFlights)
         setDisplayed(filteredFlights)
     },[])
     const displayFlex ={ display: "flex", direction: "row", marginTop:'10px'}
     
     const title= (input, type)=>{
       return (<div style={displayFlex}>
        {type=="departure" ? <FaPlaneDeparture style={{fontSize: '200%', color:'#1890ff'}} />:
        <FaPlaneArrival style={{fontSize: '200%', color:'#1890ff'}}/> }
        <Title style={{marginLeft:'15px', color:'#1890ff'}} level={3} >{input}</Title> 
       </div>)
     }


    return(
  <Card title={<Title style={{marginLeft:'15px'}} level={2} >Select Return Flight</Title> } bordered={false} 
   style={{ marginLeft:'10%' , marginRight:'10%', marginTop:'5%' }}  >
        <Steps size="default" current={1}>
          <Step title="Departure Flight" />
          <Step title="Return Flight" />
          <Step title="Checkout" />
        </Steps>

        <Card title={title("Chosen Departure Flight","departure")}  style={{marginTop:'30px'}}>
        <FlightListItem flight={flight} hideButton={true} />
        </Card>
      
        { displayed &&
         <Card title={title("Available Return Flights","return")} bordered={false} >
        <List
            itemLayout="vertical"
            size="large"
            pagination={{ pageSize: 5 }}
            dataSource={displayed}
            renderItem={ f => (    
            <FlightListItem flight={f} departureFlight={flight} /> )} /> 
         </Card>
            }
         
        </Card>
        
        
    )
}
export default ReturnFlights;

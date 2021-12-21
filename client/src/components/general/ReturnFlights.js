import React, { useEffect, useState , useContext } from 'react';
import axios from 'axios';
import { List, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FlightListItem from './FlightListItem';
import {Button, Modal, Card ,Tooltip,Steps} from 'antd';
import { SearchOutlined, PlusOutlined  } from '@ant-design/icons';
import SearchForm from '../SearchForm';
import { Link } from 'react-router-dom';
import {UserContext} from "../../Context";
const { Step } = Steps;
const { Title } = Typography;

function ReturnFlights({flight}){

    const {flights, setFlights} = useContext(UserContext);
    const [displayed, setDisplayed] =useState(null)

    // useEffect(()=>{

    //     setDisplayed(flights.filter((f)=>{
    
          
    //         if(f.arrAirport!=flight.deptAirport || f.deptAirport!=flight.arrAirport){
             
    //           return false
    //         }
    //         switch(flight.cabin){
    //             case "economy": {
    //                 if(f.nOfEconomy<flight.seats){
    //                     return false;
    //                 }
    //             }
    //             case "business": {
    //                 if(f.nOfBuisness<flight.seats){
    //                     return false;
    //                 }
    //             }
    //             case "first":{
    //                 if(f.nOfFirst<flight.seats){
    //                     return false;
    //                 }
    //             }
    //             default: break;
    //         }
    //         return true;
    //       }
         
  
    //     ))
        

    //  },[])
    return(
  <Card title="Select return Flight" bordered={false} 
   style={{ marginLeft:'10%' , marginRight:'10%', marginTop:'5%' }}  >
        <Steps size="default" current={1}>
          <Step title="Departure Flight" />
          <Step title="Return Flight" />
          <Step title="Checkout" />
        </Steps>
        
    </Card>
        
        
    )
}
export default ReturnFlights;
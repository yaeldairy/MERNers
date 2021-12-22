import { Button, Card, Typography, Modal, Steps } from 'antd';
import { useEffect , useContext} from 'react';
import {UserContext} from "../../Context";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
const { Step } = Steps;

function generateBookingNumber(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

function Checkout (){
   
    const {accessToken, departureFlight, returnFlight,cabin, noOfSeats } = useContext(UserContext);

    const onClick = async (e)=> {

     e.preventDefault();
     const bookingNumber=generateBookingNumber(7);
     try{
      
      const flightOne = await axios({
        method: 'patch', //should be patch
        url: 'http://localhost:3001/user/addFlight',   
        headers: { Authorization: `Bearer ${accessToken}`},
        data : { 
          flight:{
            ...departureFlight,
            price: departureFlight.totalPrice * noOfSeats.number,
            bookingNumber,
            type: "departure",
            cabin,
            noOfSeats}   
        } 
      });
      const flightTwo = await axios({
        method: 'patch', //should be patch
        url: 'http://localhost:3001/user/addFlight',   
        headers: { Authorization: `Bearer ${accessToken}`},
        data : { 
          flight:{
            ...returnFlight,
            price: returnFlight.totalPrice * noOfSeats.number,
            bookingNumber,
            type: "return",
            cabin,
            noOfSeats}   
        } 
      });
      console.log(flightOne);
     } catch(e){
       console.log(e)

    }
    }
    useEffect(()=>{
      const bookingNumber=generateBookingNumber(7);
     const object = { 
        ...departureFlight,
        price: departureFlight.price * noOfSeats.number,
        bookingNumber,
        type: "departure",
        cabin,
        noOfSeats
       } 
       console.log(object)
    },[])

    return(
        <Card 
        title="Checkout"
        style={{ marginLeft:'10%' , marginRight:'10%', marginTop:'5%' }}>
        <Steps size="default" current={2}>
          <Step title="Departure Flight" />
          <Step title="Return Flight" />
          <Step title="Checkout" />
        </Steps>
        <Button onClick={onClick} style={{marginTop:'100px'}} type="primary">Book Flight</Button>
        </Card>
    )
}
export default Checkout;
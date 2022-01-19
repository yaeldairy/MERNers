import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";
import { Button, Card, Typography, Modal, Steps, Popconfirm , Alert , message} from 'antd';
import {FaCcStripe } from "react-icons/fa"
const {Title} = Typography;
const stripePromise = loadStripe("pk_test_51KH6wELePquds3rDYJlyvrCVLkIFTijWyb18tDaHClW7hwQWJTXHLWIZYiozGJya6kMOytEBwRDkgrEkbEAkn5M300NXV6Gv06");


const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function PaymentForm( {onClick , booking , amount} ){

    let navigate = useNavigate();
    const { accessToken } = useContext(UserContext);
    const [success , setSuccess] = useState(false)
    const [error, setError] = useState(false);
    const stripe = useStripe()
    const elements = useElements()
    console.log(booking);
 
    const handleSubmit = async (e) => {
      const hide = message.loading('Reserving your flight');
      console.log(elements.getElement(CardElement))
      e.preventDefault()
      const {error , paymentMethod} = await stripe.createPaymentMethod({
        type : "card",
        card: elements.getElement(CardElement)
      })
      console.log(error)
     if(!error){
      try{
        console.log(paymentMethod)
        const {id} = paymentMethod
        await onClick(id);
        setSuccess(true);
        message.success('Reservation made successfully.', 2)
     }
      catch(error){
          console.log("Error" , error)
         // hide()
          message.error ('Unable to connect to the server. Please try again later.');
      }
    }
    else {
      setError(error.message)
      console.log(error.message)
  
    }
  
    
    }
    const displayFlex ={ display: "flex", direction:"row", marginTop:'10px'}
    const title=(<div style={{displayFlex}}>
      <FaCcStripe style={{fontSize:'60px'}}/>
      <Title style={{ color:'#6495ED' , fontSize:'30px'}} level={3} >Payment Page</Title> 
    </div>)

    if (success) {
      navigate(`/bookings/${booking}`, { state : {booking: booking, editable: true} })
    }
    return (
      <>
      
        <Card type="inner" title={title} style={{ marginLeft:'30%' , marginRight:'30%', marginTop:'5%', textAlign:'center'}}>
        <form onSubmit={handleSubmit} style={{marginRight:'5%',marginLeft:'5%' , marginTop:'10%'}}>
          <fieldset className="FormGroup">
            <div className="FormRow" >
              <CardElement options={CARD_OPTIONS}/>
            </div>
          </fieldset>
          <div style={{ textAlign: 'center' }}>

          {error && <Alert style={{marginTop:'30px'}} message={error} type="error" />}

          <Button size='large' style={{ marginTop: '50px' }} type="primary" ghost>
          <Popconfirm
            title="Are you sure you want to book this flight?"
            onConfirm={handleSubmit}
            okText="Yes"
            cancelText="No"
          >
           Confirm Booking
          </Popconfirm>
        </Button>
          </div>      
        </form>
        </Card>
    
    </>
  );
}
export default PaymentForm;
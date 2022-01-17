import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState , useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Button , Card, Typography , Popconfirm} from 'antd';
import { UserContext } from "../../Context";
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

function PaymentForm( amount ){
    const { accessToken } = useContext(UserContext);
    const [success , setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const onClick = () => {
      navigate('/');
    }
 
    const handleSubmit = async (e) => {
      e.preventDefault()
      const {error , paymentMethod} = await stripe.createPaymentMethod({
        type : "card",
        card: elements.getElement(CardElement)
      })
    if(!error){
      try{
        const {id} = paymentMethod
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3001/user/payment',
          headers: { Authorization: `Bearer ${accessToken}` },
          data: {
            amount,
            id
          }
        });
        if(response.data.success){
          console.log("Successful payment")
          setSuccess(true)
        }
      }
      catch(error){
          console.log("Error" , error)
      }
    }
    else{
      console.log(error.message)
    }
    }
    const displayFlex ={ display: "flex", direction: "row", marginTop:'10px'}
    const title=(<div style={displayFlex}>
      <Title style={{marginLeft:'170px', color:'#6495ED' , fontSize:'30px'}} level={3} >Payment Page</Title> 
    </div>)
    return (
      <>
        {!success?
        <Card title={title} style={{ marginLeft:'30%' , marginRight:'30%', marginTop:'5%' , height:'350px'}}>
        <form onSubmit={handleSubmit} style={{marginLeft:'6%' , marginTop:'10%'}}>
          <fieldset className="FormGroup">
            <div className="FormRow" style={{textAlign:'center'}}>
              <CardElement options={CARD_OPTIONS}/>
            </div>
          </fieldset>
          <button className="pbutton" type="primary"  >Pay</button>
          <div style={{marginTop:'2%' , marginLeft: '62%'}}>
          <button className="cbutton" type="primary" >
          <Popconfirm
            title="Are you sure you want to cancel this payment?"
            onConfirm={onClick}
            okText="Yes"
            cancelText="No"
          >
            Cancel
          </Popconfirm>
          </button>
          </div>
        </form>
        </Card>
        :
        <div>
          <h2 className="title">Payment has been made successfully!</h2>
        </div>
       
      }
      </>
    );
}
export default PaymentForm;
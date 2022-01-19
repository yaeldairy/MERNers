import { Result, Button } from 'antd';
import { useState } from 'react';
import SeatSelection from './SeatSelection';

function BookingSuccess ({departureFlight,returnFlight}){

   const [redirect, setRedirect]=useState(false);
   const [redirect2, setRedirect2]=useState(false);


   const onButtonClick= (e)=>{

       e.preventDefault();
       setRedirect(true);

   }

   const onButtonClick2= (e)=>{

    e.preventDefault();
    setRedirect2(true);

}

   if(redirect){
     return <SeatSelection flight={departureFlight} setRedirect={setRedirect}/>
   }
   if(redirect2){
    return <SeatSelection flight={returnFlight} setRedirect={setRedirect2}/>
  }
   

    return( <Result
        status="success"
        title="Booking Successful!"
        subTitle="You should recieve a confirmation email with details about your booking"
        extra={[
          <Button onClick={onButtonClick} type="primary" key="console">
            Select Departure Seats
          </Button>
          ,
           <Button onClick={onButtonClick2} type="primary" key="console2">
           Select Return Seats
         </Button>
        ]}
      />)
}
export default BookingSuccess;
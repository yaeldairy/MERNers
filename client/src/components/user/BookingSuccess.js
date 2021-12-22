import { Result, Button } from 'antd';
import { useState } from 'react';
import SeatSelection from './SeatSelection';

function BookingSuccess ({flight}){

   const [redirect, setRedirect]=useState(false);

   const onButtonClick= (e)=>{

       e.preventDefault();
       setRedirect(true);

   }

   if(redirect){
     return <SeatSelection flight={flight}/>
   }

    return( <Result
        status="success"
        title="Booking Successful!"
        subTitle="You should recieve a confirmation email with details about your booking"
        extra={[
          <Button onClick={onButtonClick} type="primary" key="console">
            Select Seats
          </Button>
        ]}
      />)
}
export default BookingSuccess;
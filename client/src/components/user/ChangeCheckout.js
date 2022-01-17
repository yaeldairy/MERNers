import { Result, Card } from 'antd';
import { useContext, useEffect , useState} from 'react';
import { UserContext } from "../../Context";
import axios from 'axios';


function ChangeCheckout(oldFlight, oldCabin, flight, cabin, type, booking, pricediff, noOfSeats) {

    const { accessToken} = useContext(UserContext);
    var emailBody;
    var newFlightUser;
    const {email , setEmail} = useState();

    function setFlight() {
        newFlightUser = {
            arrAirport: flight.arrAirport,
            arrTime: flight.arrTime,
            bookingNumber: booking,
            cabin: cabin,
            date: flight.date,
            deptAirport: flight.deptAirport,
            deptTime: flight.deptTime,
            flightId: flight.flightId,
            flightNum: flight.flightNum,
            noOfSeats: noOfSeats,
            seat: [],
            totalPrice: noOfSeats.number * flight.price,
            type: type
        }
    }
    const updateBack = async (e) => {
        e.preventDefault();
        const updateBooking =  await axios({
          method: 'patch', //should be patch
          url: 'http://localhost:3001/user/updateBooking',
          headers: { Authorization: `Bearer ${accessToken}` },
          data: { 
            //   newFlightUser,
            //   oldFlightUser,
            //   newFlight,
            //   oldFlight,



            }
        });
    }

    const sendEmailCharge = 
     `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${booking} for flights.</p>
    <p>You have been charged an amount of ${pricediff}.</p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;
    

    const sendEmailRefund = 
     `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${booking} for flights.</p>
    <p>You will be refunded an amount of ${pricediff}.</p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;
    
    const sendEmail = 
     `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${booking} for flights.</p>
    <p></p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;
    

    useEffect(() => {
        if (pricediff === 0)
            setEmail(sendEmail);
        else if (pricediff < 0)
            setEmail(sendEmailRefund);
        else
            setEmail(sendEmailCharge);
    }, [])

    return (

        <Card >

            <Result
                status="success"
                title="Booking Successful!"
                subTitle="You should receive a confirmation email with details about your booking"
            />
        </Card>
    )
}
export default ChangeCheckout;
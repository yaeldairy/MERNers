import { Result, Card } from 'antd';
import { useContext, useEffect } from 'react';
import { UserContext } from "../../Context";
import axios from 'axios';


function ChangeCheckout(oldFlight, oldCabin, flight, cabin, type, booking, pricediff, noOfSeats) {

    //const { accessToken, departureFlight, returnFlight, cabin, noOfSeats } = useContext(UserContext);
    var emailBody;
    var newFlight;

    function setFlight() {
        newFlight = {
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
    function updateBack() {
        // const updateBooking = await axios({
        //   method: 'patch', //should be patch
        //   url: 'http://localhost:3001/user/updateBooking',
        //   headers: { Authorization: `Bearer ${accessToken}` },
        //   data: { flight: newFlight }
        // });
    }

    function sendEmailCharge() {
        emailBody = `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${booking} for flights.</p>
    <p>You have been charged an amount of ${pricediff}.</p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;
        updateBack();
    }

    function sendEmailRefund() {
        emailBody = `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${booking} for flights.</p>
    <p>You will be refunded an amount of ${pricediff}.</p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;
        updateBack();
    }
    function sendEmail() {
        emailBody = `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${booking} for flights.</p>
    <p></p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;
        updateBack();
    }

    useEffect(() => {
        if (pricediff === 0)
            sendEmail();
        else if (pricediff < 0)
            sendEmailRefund();
        else
            sendEmailCharge();
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
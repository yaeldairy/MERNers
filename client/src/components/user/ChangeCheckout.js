import { Result, Card } from 'antd';
import { useContext, useEffect } from 'react';
import { UserContext } from "../../Context";
import axios from 'axios';


function ChangeCheckout(data) {
    const {oldFlight, oldUserFlight, newFlight, type, cabin, pricediff} = data;
    // console.log("CHANGE CHECKOUT")
    // console.log(oldFlight);//undefined
    // console.log(oldUserFlight);
    // console.log(newFlight);
    // console.log(type);
    // console.log(cabin);//undefined
    // console.log(pricediff);
    // console.log("END")
    //console.log(oldUserFlight.seat.length());
    // console.log(oldUserFlight.seat.length);
    //new old flights
    //const { username, email } = useContext(UserContext);
    var emailBody;
    var newUserFlight;
    // var f = flight;
    function setFlight() {
        switch (cabin) {
            case "First":
                newFlight.remainingSeats.First -= oldUserFlight.noOfSeats.number; break;
            case "Business":
                newFlight.remainingSeats.Business -= oldUserFlight.noOfSeats.number; break;
            case "Economy":
                newFlight.remainingSeats.Economy -= oldUserFlight.noOfSeats.number; break;
            default: break;
        }

        switch (oldUserFlight.cabin) {
            case "First":
                oldFlight.remainingSeats.First += oldUserFlight.noOfSeats.number; break;
            case "Business":
                oldFlight.remainingSeats.Business += oldUserFlight.noOfSeats.number; break;
            case "Economy":
                oldFlight.remainingSeats.Economy += oldUserFlight.noOfSeats.number; break;
            default: break;

        }
        // oldFlight.takenSeats.concat();
        var index;
        for (let i = 0; i < oldUserFlight.seat.length; i++) {
            index = oldFlight.takenSeats.indexOf(oldUserFlight.seat[i]);
            oldFlight.takenSeats.splice(index, 1);
        }
        newUserFlight = {
            arrAirport: newFlight.arrAirport,
            arrTime: newFlight.arrTime,
            bookingNumber: oldUserFlight.booking,
            cabin: cabin,
            date: newFlight.date,
            deptAirport: newFlight.deptAirport,
            deptTime: newFlight.deptTime,
            flightId: newFlight.flightId,
            flightNum: newFlight.flightNum,
            noOfSeats: oldUserFlight.noOfSeats,
            seat: [],
            totalPrice: oldUserFlight.noOfSeats.number * newFlight.price,
            type: type
        }
    }
    function updateBack() {
       
    }

    function sendEmailCharge() {
        emailBody = `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${oldUserFlight.booking} for flights.</p>
    <p>You have been charged an amount of ${pricediff}.</p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;
        updateBack();
    }

    function sendEmailRefund() {
        emailBody = `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${oldUserFlight.booking} for flights.</p>
    <p>You will be refunded an amount of ${pricediff}.</p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;
        updateBack();
    }
    function sendEmail() {
        emailBody = `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${oldUserFlight.booking} for flights.</p>
    <p></p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;
        updateBack();
    }

    useEffect(() => {
        setFlight();
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
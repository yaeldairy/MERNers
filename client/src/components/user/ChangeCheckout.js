import { Result, Card } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../Context";
import axios from 'axios';


function ChangeCheckout(data) {
    const { oldFlight, oldUserFlight, newFlight, type, cabin, pricediff } = data;
    const { accessToken } = useContext(UserContext);
    const { email, setEmail } = useState(null);
    const [newUserFlight, setNewUserFlight] = useState(null);
    
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
        
        var index;
        for (let i = 0; i < oldUserFlight.seat.length; i++) {
            index = oldFlight.takenSeats.indexOf(oldUserFlight.seat[i]);
            oldFlight.takenSeats.splice(index, 1);
        }
        setNewUserFlight({
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
        });
    }
    const updateBack = async (e) => {
        e.preventDefault();
        const updateBooking = await axios({
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
    <p>This is to confirm your flight change in booking ${oldUserFlight.booking} for flights.</p>
    <p>You have been charged an amount of ${pricediff}.</p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;


    const sendEmailRefund =
        `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${oldUserFlight.booking} for flights.</p>
    <p>You will be refunded an amount of ${pricediff}.</p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;

    const sendEmail =
        `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${oldUserFlight.booking} for flights.</p>
    <p></p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;


    useEffect(() => {
        setFlight();
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
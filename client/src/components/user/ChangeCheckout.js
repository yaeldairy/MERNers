import { Result, Card } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../Context";
import StripePay from './StripePay';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function ChangeCheckout() {
    const location = useLocation();
    const { oldFlight, oldUserFlight, newFlight, type, cabin,pricediff } = location.state;
    const { accessToken } = useContext(UserContext);
    const [email, setEmail] = useState(null);
    const sendEmailCharge =
        `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${oldUserFlight.bookingNumber} for flights.</p>
    <p>You have been charged an amount of ${pricediff}.</p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;


    const sendEmailRefund =
        `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${oldUserFlight.bookingNumber} for flights.</p>
    <p>You will be refunded an amount of ${Math.abs(pricediff)}.</p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;

    const sendEmail =
        `<p>Hello,</p>
    <br/>
    <p>This is to confirm your flight change in booking ${oldUserFlight.bookingNumber} for flights.</p>
    <p></p>
    <br/>
    <p>Best wishes,</p>
    <p>ACL Airlines</p>`;
    const [newUserFlight, setNewUserFlight] = useState({
        arrAirport: newFlight.arrAirport,
        arrTime: newFlight.arrTime,
        bookingNumber: oldUserFlight.bookingNumber,
        cabin: cabin,
        date: newFlight.date,
        deptAirport: newFlight.deptAirport,
        deptTime: newFlight.deptTime,
        _id: newFlight._id,
        flightNum: newFlight.flightNum,
        noOfSeats: oldUserFlight.noOfSeats,
        takenSeats: [],
        price: oldUserFlight.noOfSeats.number * newFlight.price,
        type: type
    });
    let navigate = useNavigate();
    // console.log("BEFOREEEE");
    // console.log(oldFlight);
    // console.log(oldUserFlight);
    // console.log(newFlight);
    // console.log(type);
    // console.log(cabin);
    // console.log(pricediff);


    function setFlight() {
        console.log("fel switch")
        console.log(newFlight.remainingSeats);
        switch (cabin) {
            case "First":
                newFlight.remainingSeats[2] -= oldUserFlight.noOfSeats.number; break;
            case "Business":
                newFlight.remainingSeats[1] -= oldUserFlight.noOfSeats.number; break;
            case "Economy":
                newFlight.remainingSeats[0] -= oldUserFlight.noOfSeats.number; break;
            default: break;
        }
        console.log(newFlight.remainingSeats);
        console.log("fel switch tany")
        console.log(oldFlight.remainingSeats);
        switch (oldUserFlight.cabin) {
            case "First":
                oldFlight.remainingSeats[2] += oldUserFlight.noOfSeats.number; break;
            case "Business":
                oldFlight.remainingSeats[1] += oldUserFlight.noOfSeats.number; break;
            case "Economy":
                oldFlight.remainingSeats[0] += oldUserFlight.noOfSeats.number; break;
            default: break;
        }

        console.log(oldFlight.remainingSeats);

        var index;
        for (let i = 0; i < oldUserFlight.takenSeats.length; i++) {
            index = oldFlight.takenSeats.indexOf(oldUserFlight.takenSeats[i]);
            oldFlight.takenSeats.splice(index, 1);
        }
        // setNewUserFlight();
        console.log("BEFOREEEE");
        console.log(oldFlight);
        console.log(oldUserFlight);
        console.log(newFlight);
        console.log(newUserFlight);
        console.log(type);
        console.log(cabin);
        console.log(pricediff);
    }

    


    const updateBack = async (id) => {
        if (pricediff === 0) {
            const updateBooking = await axios({
                method: 'patch', //should be patch
                url: 'http://localhost:3001/user/editBooking',
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {
                    id,
                    email: sendEmail,
                    newUserFlight,
                    oldUserFlight,
                    newFlight,
                    oldFlight,
                }
            });
        }
        else if (pricediff < 0) {
            const updateBooking = await axios({
                method: 'patch', //should be patch
                url: 'http://localhost:3001/user/editBooking',
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {
                    email: sendEmailRefund,
                    newUserFlight,
                    oldUserFlight,
                    newFlight,
                    oldFlight,
                }
            });
        }
        else {
            const updateBooking = await axios({
                method: 'patch', //should be patch
                url: 'http://localhost:3001/user/editBooking',
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {
                    email: sendEmailCharge,
                    newUserFlight,
                    oldUserFlight,
                    newFlight,
                    oldFlight,
                }
            });
        }

    }

    

    useEffect(() => {
        setFlight();
        if (pricediff === 0)
            setEmail(sendEmail);
        else if (pricediff < 0)
            setEmail(sendEmailRefund);
        else
            setEmail(sendEmailCharge);
        updateBack();
        if (pricediff <= 0)
            navigate(`/bookings/${oldUserFlight.bookingNumber}`, { state: { booking: oldUserFlight.bookingNumber } })
    }, [])

    return (
        (pricediff > 0 ?
            <StripePay amount={pricediff} booking={oldUserFlight.bookingNumber} onClick={updateBack} /> : <></>)

    )
}
export default ChangeCheckout;
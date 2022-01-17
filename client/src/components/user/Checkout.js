import { Button, Card, Typography, Modal, Steps, Popconfirm } from 'antd';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from "../../Context";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import BookingSuccess from './BookingSuccess'
import Summary from './Summary';
import StripePay from './StripePay'
//import User from '../../../../server/db/models/user';
const { Title, Text } = Typography;
const { Step } = Steps;

function generateBookingNumber(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}



function Checkout() {

  const { accessToken, departureFlight, returnFlight, cabin, noOfSeats , username } = useContext(UserContext);
  const [success, setSuccess] = useState(false)
  console.log(departureFlight);
  console.log(returnFlight);

  const newSeats = (departureFlight) => {

    const { nOfFirst, nOfBusiness, nOfEconomy } = departureFlight;

    switch (cabin) {

      case "First":
        return {
          nOfFirst: nOfFirst - noOfSeats.number,
          nOfBusiness,
          nOfEconomy
        }
      case "Business":
        return {
          nOfFirst,
          nOfBusiness: nOfBusiness - noOfSeats.number,
          nOfEconomy
        }

      case "Economy":
        return {
          nOfFirst,
          nOfBusiness,
          nOfEconomy: nOfEconomy - noOfSeats.number
        }
      default: return;
    }
  }
  const calculatePrice = (flight) => {
    switch (cabin) {

      case "First":
        return (flight.price + 200) * noOfSeats.number
      case "Business":
        return (flight.price + 100) * noOfSeats.number
      case "Economy":
        return (flight.price) * noOfSeats.number
      default:
        return;

    }

  }

var bookingNumber;
  const onClick = async (e) => {

    e.preventDefault();
    bookingNumber = generateBookingNumber(7);
    const seats = newSeats(departureFlight);
    // console.log(noOfSeats)
    // try {

    //   const flightOne = await axios({ 
    //     method: 'patch', //should be patch
    //     url: 'http://localhost:3001/user/bookTrip',
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //     data: {
    //      departureFlight,
    //      returnFlight
    //     }
    //   });

      // const flightOne = await axios({ 
      //   method: 'patch', //should be patch
      //   url: 'http://localhost:3001/user/addFlight',
      //   headers: { Authorization: `Bearer ${accessToken}` },
      //   data: {
      //     flight: {
      //       ...departureFlight,
      //       totalPrice: calculatePrice(departureFlight),
      //       bookingNumber,
      //       type: "departure",
      //       cabin,
      //       noOfSeats
      //     }
      //   }
      // });
      // const flightTwo = await axios({
      //   method: 'patch', //should be patch
      //   url: 'http://localhost:3001/user/addFlight',
      //   headers: { Authorization: `Bearer ${accessToken}` },
      //   data: {
      //     flight: {
      //       ...returnFlight,
      //       totalPrice: calculatePrice(returnFlight),
      //       bookingNumber,
      //       type: "return",
      //       cabin,
      //       noOfSeats
      //     }
      //   }
      // });
      // const updateFlight1 = await axios({
      //   method: 'patch', //should be patch
      //   url: 'http://localhost:3001/user/updateSeats',
      //   headers: { Authorization: `Bearer ${accessToken}` },
      //   data: {
      //     flightId: departureFlight._id,
      //     ...seats

      //   }
      // });

      // const updateFlight2 = await axios({
      //   method: 'patch', //should be patch
      //   url: 'http://localhost:3001/user/updateSeats',
      //   headers: { Authorization: `Bearer ${accessToken}` },
      //   data: {
      //     flightId: returnFlight._id,
      //     ...seats

      //   }
      // });
    //   const emailBody1 = `<p>Hello,</p>
    //   <br/>
    //   <p>This is to confirm your booking number ${bookingNumber} for flights ${departureFlight.flightNum} and ${returnFlight.flightNum}.</p>
    //   <p>You have been charged an amount of $${calculatePrice(departureFlight) + calculatePrice(returnFlight)}.</p>
    //   <br/>
    //   <p>Best wishes,</p>
    //   <p>ACL Airlines</p>`;
    //   // var deptSeats = departureFlight.seat.length||"Not Specified"; 
    //   // var retSeats = returnFlight.seat.length||"Not Specified"; 
    //   const emailBody2 = `<p>Hello,</p>
    //         <br/>
    //         <p>This is your itinerary for your booking ${bookingNumber}.</p>
    //         <br/>
    //         <p>Departure Flight: ${departureFlight.flightNum}</p>
    //         <p>Departure Airport: ${departureFlight.deptAirport}</p>
    //         <p>Arrival Flight: ${departureFlight.arrAirport}</p>
    //         <p>Date: ${departureFlight.date}</p>
    //         <p>Departure time: ${departureFlight.deptTime}</p>
    //         <p>Arrival time: ${departureFlight.arrTime}</p>
    //         <p>Cabin: ${cabin}</p>
            
    //         <br/>
    //         <p>Departure Flight: ${returnFlight.flightNum}</p>
    //         <p>Departure Airport: ${returnFlight.deptAirport}</p>
    //         <p>Arrival Flight: ${returnFlight.arrAirport}</p>
    //         <p>Date: ${returnFlight.date}</p>
    //         <p>Departure time: ${returnFlight.deptTime}</p>
    //         <p>Arrival time: ${returnFlight.arrTime}</p>
    //         <p>Cabin: ${cabin}</p>
    //         <br/>
    //         <p>Enjoy your trip!</p>
    //         <br/>
    //         <p>Best wishes,</p>
    //         <p>ACL Airlines</p>`;
    //   const saveBooking = await axios({
    //     method: 'patch', //should be patch
    //     url: 'http://localhost:3001/user/addBooking',
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //     data: { bookingNumber, emailBody1, emailBody2 }
    //   });

    setSuccess(true)

    // } catch (e) {
    //   console.log(e)

    // }
  }
  // useEffect(()=>{
  //   const bookingNumber=generateBookingNumber(7);
  //  const object = { 
  //     ...departureFlight,
  //     price: departureFlight.price * noOfSeats.number,
  //     bookingNumber,
  //     type: "departure",
  //     cabin,
  //     noOfSeats
  //    } 
  //    console.log(object)
  // },[])

  const title = (<Title level={2} >Booking Summary</Title>)

  if (success) {
    //return <BookingSuccess departureFlight={departureFlight} returnFlight={returnFlight} />
    return <StripePay amount={calculatePrice(departureFlight) + calculatePrice(returnFlight)} booking={bookingNumber}/>
  }

  return (

    <Card title={title}
      style={{ textAlign: 'left', marginLeft: '10%', marginRight: '10%', marginTop: '5%' }} >
      <Steps size="default" current={2}>
        <Step title="Departure Flight" />
        <Step title="Return Flight" />
        <Step title="Checkout" />
      </Steps>

      <Summary depPrice={calculatePrice(departureFlight)} retPrice={calculatePrice(returnFlight)} deptFlight={departureFlight} retFlight={returnFlight} nOfAdults={noOfSeats.Adults} nOfChild={noOfSeats.Children} cabin={cabin} />
      <div style={{ textAlign: 'center' }}>

        <Button size='large' style={{ marginTop: '50px' }} type="primary">
          <Popconfirm
            title="Are you sure you want to book this flight?"
            onConfirm={onClick}

            okText="Yes"
            cancelText="No"
          >
            Book Flight
          </Popconfirm>
        </Button>

      </div>
    </Card>
  )
}
export default Checkout;
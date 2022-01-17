import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { List, Typography, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import FlightListItem from '../general/FlightListItem';
import AlternativeFlightListItem from './AlternativeFlightListItem';
import { Button, Spin, Card, Tooltip, Steps } from 'antd';
import { UserContext } from "../../Context";
import axios from 'axios';
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa"
import SearchAlternativeFlights from './SearchAlternativeFlights';
const { Step } = Steps;
const { Title } = Typography;

function AlternativeFlights() {

  const location = useLocation();
  const { type, flight, seatType } = location.state;
  const seats = flight.noOfSeats.number;
  const booking = flight.bookingNumber;
  console.log(flight);

  const [displayed, setDisplayed] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:3001/flights')
      .then((res) => {

        //(res.data)
        const filteredFlights = res.data.filter((f) => {
          // console.log(f);
          
          if (f.arrAirport !== flight.arrAirport || f.deptAirport !== flight.deptAirport) {
            return false;
          }
          switch (seatType) {
            case "First":
              if (f.nOfFirst < seats) {
                return false;
              }
              break;
            case "Economy":
              if (f.nOfEconomy < seats) {
                return false;
              }
              break;

            case "Business":
              if (f.nOfBusiness < seats) {
                return false;
              }
              break;
          }
          return true;
        })
        setLoading(false)
        setDisplayed(filteredFlights)
        setFiltered(filteredFlights)
      })
      .catch((e) => {
        // setError(true) 
      })
  }, [])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (flight) => {

    setIsModalVisible(false);


    setFiltered(displayed.filter((f) => {


      for (const property in flight) {
        console.log(property)
        // console.log(flight[property])

        if (property == "cabin") {

          // console.log(flight[property])
          switch (flight.cabin) {
            case "First":
              // console.log((f.nOfFirst < (flight.noOfAdults + flight.noOfChildren)));
              if (f.nOfFirst < seats) {
                return false;
              }
            case "Business":
              if (f.nOfBusiness < seats)
                return false;
            case "Economy":
              if (f.nOfEconomy < seats)
                return false;
          }
        }
        else if (flight[property] !== '' && f[property] !== flight[property]) {
          return false
        }
      }
      return true;

    }))
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const CalPrice = (price) => {
    // console.log(flight.totalPrice);
    // console.log(price);
    // console.log(flight.totalPrice-price);
    return flight.totalPrice - (price*seats);
  }

  const displayFlex = { display: "flex", direction: "row", marginTop: '10px' }

  const title = (input, type) => {
    return (<div style={displayFlex}>
      {type == "departure" ? <FaPlaneDeparture style={{ fontSize: '200%', color: '#1890ff' }} /> :
        <FaPlaneArrival style={{ fontSize: '200%', color: '#1890ff' }} />}
      <Title style={{ marginLeft: '15px', color: '#1890ff' }} level={3} >{input}</Title>
    </div>)
  }


  return (
    <div>
      <Card title={<Title style={{ marginLeft: '15px' }} level={2} >Select alternative {type} flight</Title>} bordered={false}
        style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%' }}  >


        <Card title={title(`chosen ${type} flight`, type)} style={{ marginTop: '30px' }}>
          <FlightListItem flight={flight} hideButton={true} />
        </Card>

        <Spin spinning={loading} delay={400} >
          <Card title={title("Alternative Flights", type)} bordered={false} extra={<Button onClick={showModal} shape="circle" icon={<SearchOutlined />} />}>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{ pageSize: 5 }}
              dataSource={filtered}
              renderItem={f => (
                <AlternativeFlightListItem flight={f} pricediff={CalPrice(f.price)} booking = {booking} type = {type} cabin ={flight.cabin} noOfSeats={flight.noOfSeats}/>)} />
          </Card>
        </Spin>

      </Card>

      <Modal
        title="Search Flights"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[ /*add modal buttons here */]}>
        <SearchAlternativeFlights handleOk={handleOk} />
      </Modal>
    </div>
  )
}
export default AlternativeFlights;
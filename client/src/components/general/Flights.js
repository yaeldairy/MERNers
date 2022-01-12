import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { List, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FlightListItem from './FlightListItem';
import { Button, Modal, Card, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import SearchForm from '../SearchForm';
import { Link } from 'react-router-dom';
import { UserContext } from "../../Context";
const { Title } = Typography;

const title = (<Title level={2} >Flights</Title>)



export default function Flights() {

  const { flights, setFlights } = useContext(UserContext);
  const [displayed, setDisplayed] = useState(null);
  const [error, setError] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {

    axios.get('http://localhost:3001/flights')
      .then((res) => {

        setFlights(res.data)
        setDisplayed(res.data)

      })
      .catch((e) => {
        setError(true)
      })

  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (flight) => {

    setIsModalVisible(false);
    console.log("flight input to search")
    console.log(flight)

    setDisplayed(flights.filter((f) => {
      // console.log("flight current")
      //console.log(f)
      //console.log("flight date current"+f.date)
      console.log(flight)



      for (const property in flight) {
        console.log(property)
        // console.log(flight[property])

        if (property == "noOfAdults" || property == "noOfChildren") {
          if (f.nOfBusiness + f.nOfEconomy + f.nOfFirst < (flight.noOfAdults + flight.noOfChildren)) {
            return false;
          }
        }
        else if (property == "cabin") {

          console.log("HENAAAAAAAAA ")
          console.log(flight[property])
          switch (flight.cabin) {
            case "First":
              console.log((f.nOfFirst < (flight.noOfAdults + flight.noOfChildren)));
              if (f.nOfFirst < (flight.noOfAdults + flight.noOfChildren)) {
                return false;
              }
            case "Business":
              if (f.nOfBusiness < (flight.noOfAdults + flight.noOfChildren))
                return false;
            case "Economy":
              if (f.nOfEconomy < (flight.noOfAdults + flight.noOfChildren))
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


  const searchButton = (
    <div>
      <Tooltip title="create flight">
        <Button shape="circle" >
          <Link to={{ pathname: `newFlight` }}  >
            <PlusOutlined />
          </Link></Button>
      </Tooltip>
      <Tooltip title="search">
        <Button style={{ marginLeft: '10px' }} onClick={showModal} shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
    </div>)

  if (error) {
    return (<h1>oops, There seems to have been a network error</h1>)
  }

  return (
    <div>

      <Card title={title} bordered={true} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%' }} extra={searchButton}>
        {!displayed ? <LoadingOutlined style={{ fontSize: 50 }} spin /> :
          <div className='activities-list'>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{ pageSize: 5 }}
              dataSource={displayed}
              renderItem={flight => (
                <FlightListItem flight={flight} />)} />
          </div>}

      </Card>

      <Modal
        title="Search Flights"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[ /*add modal buttons here */]}>
        <SearchForm handleOk={handleOk} />
      </Modal>

    </div>
  )



}

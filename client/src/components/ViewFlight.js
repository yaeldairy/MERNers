import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button, Popconfirm } from 'antd';



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




export default function ViewFlight() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { flight } = location.state;

  function handlerr() {
    axios({
      method: 'POST',
      url: 'http://localhost:3001/admin/deleteFlight',
      data: {
        id: flight._id
      }
    }).then((res) => {
      navigate('/');
      // console.log(res)
      // console.log("flight deleted")          

    }).catch((err) => {
      // console.log(err)
      // console.log("couldn't delete flight")

    });

  };

  useEffect(() => {
    setLoading(true);
    if (flight == null) {
      setError(true);
      return;
    }
    setLoading(false);
    // console.log(flight);
  }, []);

  const rows = {
    flightNum: flight.flightNum,
    deptAirport: flight.deptAirport,
    arrAirport: flight.arrAirport,
    deptTime: flight.deptTime,
    arrTime: flight.arrTime,
    duration: flight.duration,
    date: flight.date,
    arrDate: flight.arrDate,
    nOfEconomy: flight.nOfEconomy,
    nOfBusiness: flight.nOfBusiness,
    nOfFirst: flight.nOfFirst,
    price: flight.price
  };

  return (
    <>{error ? (<div> ERROR </div>) : (
      loading ? (<div>Loading... </div>) :
        (
          <div>
            <Item>Flight: {rows.flightNum}</Item>
            <Stack direction="row">
              <Item>Departure</Item>
              <Item justifyContent="flex-end">{rows.deptAirport}</Item>
            </Stack>
            <Stack direction="row">
              <Item>Arrival</Item>
              <Item justifyContent="flex-end">{rows.arrAirport}</Item>
            </Stack>
            <Stack direction="row">
              <Item>Departure Time</Item>
              <Item justifyContent="flex-end">{rows.deptTime}</Item>
            </Stack>
            <Stack direction="row">
              <Item>Arrival Time</Item>
              <Item justifyContent="flex-end">{rows.arrTime}</Item>
            </Stack>
            <Stack direction="row">
              <Item>Duration</Item>
              <Item justifyContent="flex-end">{rows.duration}</Item>
            </Stack>
            <Stack direction="row">
              <Item>Departure Date</Item>
              <Item justifyContent="flex-end">{rows.date}</Item>
            </Stack>
            <Stack direction="row">
              <Item>Arrival Date</Item>
              <Item justifyContent="flex-end">{rows.arrDate}</Item>
            </Stack>
            <Stack direction="row">
              <Item>Economy class seats left</Item>
              <Item justifyContent="flex-end">{rows.nOfEconomy}</Item>
            </Stack>
            <Stack direction="row">
              <Item>Business class seats left</Item>
              <Item justifyContent="flex-end">{rows.nOfBusiness}</Item>
            </Stack>
            <Stack direction="row">
              <Item>First class seats left</Item>
              <Item justifyContent="flex-end">{rows.nOfFirst}</Item>
            </Stack>
            <Stack direction="row">
              <Item>Base Price</Item>
              <Item justifyContent="flex-end">{rows.price}</Item>
            </Stack>
            <Button>
              <Link to={{ pathname: `/updateFlight/${flight.flightNum}` }} state={{ flight: flight }}>
                Update
              </Link>
            </Button>
            <Button>
              <Popconfirm title="Are you sure you want to delete this flight?" onConfirm={handlerr} okText="Yes" cancelText="No">
                <a href="#">Delete</a>
              </Popconfirm>
            </Button>
          </div>
        ))}
    </>
  )


}
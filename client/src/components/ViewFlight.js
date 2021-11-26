import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';

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

  


export default function ViewFlight(){

    const [loading, setLoading] = useState(false);//loading state
    const [error, setError] = useState(null);
    const location = useLocation();
    const { flight } = location.state;

    function handlerr()  {
        axios({
          method: 'POST',
          url: 'http://localhost:3001/admin/deleteFlight',
          data: {
            id : flight._id
          }
        }).then((res)=>{
          window.location.href='/'
          console.log(res)
          console.log("flight deleted")          
  
      }).catch((err)=>{
          console.log(err)
          console.log("couldn't delete flight")
  
      });
      
    };

    useEffect(() => {
        setLoading(true);
        if (flight==null){
            setError(true);
            return;
        }
        setLoading(false);
        console.log(flight);
      },[]);// fetched data on render

    const rows = {flightNum: flight.flightNum,
        deptAirport: flight.deptAirport,
        arrAirport: flight.arrAirport,
        deptTime: flight.deptTime,
        arrTime: flight.arrTime,
        date: flight.date,
        nOfEconomy: flight.nOfEconomy,
        nOfBusiness: flight.nOfBusiness
    };

      return(
        <>{error? (<div> ERROR </div>):(
          loading? (<div>Loading... </div>):
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
                  <Item>Date</Item>
                  <Item justifyContent="flex-end">{rows.date}</Item>
              </Stack>
              <Stack direction="row">
                  <Item>Economy seats left</Item>
                  <Item justifyContent="flex-end">{rows.nOfEconomy}</Item>
              </Stack>
              <Stack direction="row">
                  <Item>Business seats left</Item>
                  <Item justifyContent="flex-end">{rows.nOfBusiness}</Item>
              </Stack>
              <Button>
              <Link to={{pathname:`/updateFlight/${flight.flightNum}`}} state={{ flight: flight }}>
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
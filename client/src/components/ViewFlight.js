import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button } from 'antd';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  


export default function ViewFlight(param){
    const [flight, setFlight] = useState([]);//stores flight details
    const [loading, setLoading] = useState(false);//loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        if (param==null)
            setError(true);
        else
            setFlight(param);
        setLoading(false);
        // fetchData();
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
                Update
              </Button>
              <Button>
                Delete
              </Button>
          </div>
        ))}
        </>
      )
      ;

}
import React from 'react';
import 'antd/dist/antd.css';
import { Button, Card, Typography } from 'antd';
import { FaPlane , FaLongArrowAltRight} from "react-icons/fa"

import { Link } from 'react-router-dom'
const { Title, Text } = Typography;

const buttonStyle= {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}
const displayFlex ={ display: "flex", direction: "row", marginTop:'10px'}

function AlternativeFlightListItem({oldUserFlight, oldFlight, newFlight, price, type}) {
    // console.log(oldUserFlight);
    // console.log(oldFlight);
    // console.log(newFlight);
    // console.log(pricediff);
    // console.log(type);

  const title=(<div style={displayFlex}>
      <FaPlane style={{fontSize: '250%'}} />
      <Title style={{marginLeft:'15px'}} level={4} >Flight: {newFlight.flightNum}</Title> 
     </div>)
     


     //check hena

  const extra =()=>{
    return( < Button type="primary" style={buttonStyle}>
      <Link to={{pathname:`/alternativeFlight/${newFlight.flightNum}`}} state={{ oldUserFlight, oldFlight, newFlight, price, type }}>
         Flight Details
      </Link>
      </Button>)
  }
  return (
  <div>

      <Card
      style={{ marginTop: 16 }}
      type="inner"
      title={title}
      extra={extra()}
    >
   
    <div style={displayFlex}>
    <h2>{newFlight.deptAirport}</h2>
    <FaLongArrowAltRight style={{fontSize: '150%', marginTop:'10px'}} />
    <h2>{newFlight.arrAirport}</h2>
    <div  style={{marginLeft:'30px'}}>
    <Text style={{fontSize: '120%'}} italic>Flight date: {newFlight.date}</Text>
    <Text style={{fontSize: '120%',marginLeft:'15px'}} italic>Departure time: {newFlight.deptTime}</Text>
    <Text style={{fontSize: '120%',marginLeft:'15px'}} italic>Arrival time: {newFlight.arrTime}</Text>
    </div>
    </div> 
    </Card>

  </div>
          


  );
}
export default AlternativeFlightListItem;

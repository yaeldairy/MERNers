import React from 'react';
import 'antd/dist/antd.css';
import { Button, Card, Divider, List, Typography } from 'antd';
import { CarryOutOutlined, SketchOutlined } from '@ant-design/icons';
import { FaPlane , FaLongArrowAltRight} from "react-icons/fa"
const { Title, Text } = Typography;

const buttonStyle= {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}
const displayFlex ={ display: "flex", direction: "row", marginTop:'10px'}


function FlightListItem({flight}) {

  const title=(<div style={displayFlex}>
      <FaPlane style={{fontSize: '300%'}} />
      <Title style={{marginLeft:'15px'}} level={3} >Flight: {flight.flightNum}</Title> 
     </div>)

  return (
  <div>

      <Card
      style={{ marginTop: 16 }}
      type="inner"
      title={title}
      extra={<Button type="primary" style={buttonStyle}>
      Flight details
       {/*add link to flight page */}
      </Button>}
    >
   
    <div style={displayFlex}>
    <h2>{flight.deptAirport}</h2>
    <FaLongArrowAltRight style={{fontSize: '150%', marginTop:'10px'}} />
    <h2>{flight.arrAirport}</h2>
    <div  style={{marginLeft:'30px'}}>
    <Text style={{fontSize: '120%'}} italic>departure time: {flight.deptTime}</Text>
    <Text style={{fontSize: '120%',marginLeft:'15px'}} italic>arrival time: {flight.arrTime}</Text>
    </div>
    </div> 
    </Card>

  </div>
          


  );
}
export default FlightListItem;

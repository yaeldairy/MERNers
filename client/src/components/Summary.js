import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Button, Typography , Descriptions , Popconfirm} from 'antd';
import { FaPlane} from "react-icons/fa"
import { Link } from 'react-router-dom'
import CheckOutlined from '@ant-design/icons'
const { Title, Text } = Typography;

const buttonStyle= {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}
const displayFlex ={ display: "flex", direction: "row", marginTop:'10px'}
const title=(<Title  level={2} >Flight Summary Page</Title> )
function Summary (deptFlight , retFlight , seats , nOfAdults , nOfChild){

  function handlerr(){

  }
const title1=(<div style={displayFlex}>
  <FaPlane style={{fontSize: '300%'}} />
  <Title style={{marginLeft:'15px'}} level={3} >Departure Flight</Title> 
</div>)

const title2=(<div style={displayFlex}>
  <FaPlane style={{fontSize: '300%'}} />
  <Title style={{marginLeft:'15px'}} level={3} >Return Flight</Title> 
 </div>)

const style = {
  marginLeft:'0px'
};

return (
  <div>
    <Card title={title} bordered={true} style={{width:'1000px',height:'1300px',marginLeft:'280px',textAlign:'left'}} >
       { 
        <div>
            <Card title={title1} style={{width:'950px',height:'500px'}}>
              <p> Departure Airport : {deptFlight.deptAirport}</p>
              <p>Arrival Airport : {deptFlight.arrAirport} </p>
              <p>Flight Date : {deptFlight.date} </p>
              <p>Departure Time : {deptFlight.deptTime} </p>
              <p>Arrival Time : {deptFlight.arrTime} </p>
              <p>Flight Price : {deptFlight.totalPrice} </p>
              <p>Cabin Class : {deptFlight.cabin} </p>
              <p>Number of Adult Tickets : {nOfAdults} </p>
              <p>Number of Child Tickets : {nOfChild} </p>
            </Card>
         </div>}
         {
        <div>
            <Card title={title2} style={{width:'950px',height:'500px'}}>
              <p>Departure Airport : {retFlight.deptAirport}</p>
              <p>Arrival Airport : {retFlight.arrAirport}</p>
              <p>Flight Date : {retFlight.date}</p>
              <p>Departure Time : {retFlight.deptTime}</p>
              <p>Arrival Time : {retFlight.arrTime}</p>
              <p>Flight Price : {retFlight.totalPrice}</p>
              <p>Cabin Class : {retFlight.cabin}</p>
              <p>Number of Adult Tickets : {nOfAdults}</p>
              <p>Number of Child Tickets : {nOfChild}</p>
            </Card>
         </div>}
         <Button>
              <Popconfirm title="Are you sure you want to book these flights?" onConfirm={handlerr} okText="Yes" cancelText="No" icon={<CheckOutlined style={{ color: 'red' }} />}>
                <a href="#">Confirm</a>
                </Popconfirm>
                </Button>
    </Card>
  </div>
    )

}
export default Summary;
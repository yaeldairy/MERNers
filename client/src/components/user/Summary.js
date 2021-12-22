import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Button, Typography , Descriptions , Popconfirm, Steps} from 'antd';
import { FaPlane} from "react-icons/fa"
import { Link } from 'react-router-dom'
import CheckOutlined from '@ant-design/icons'
const { Title, Text } = Typography;
const { Step } = Steps;

const buttonStyle= {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}
const displayFlex ={ display: "flex", direction: "row", marginTop:'10px'}

function Summary ({depPrice , retPrice, deptFlight, retFlight , cabin , nOfAdults , nOfChild}){

  function handlerr(){

  }
const title1=(<div style={displayFlex}>
  <FaPlane style={{fontSize: '250%', color:'#1890ff'}} />
  <Title style={{marginLeft:'15px', color:'#1890ff'}} level={3} >Departure Flight</Title> 
</div>)

const title2=(<div style={displayFlex}>
  <FaPlane style={{fontSize: '250%', color:'#1890ff'}} />
  <Title style={{marginLeft:'15px', color:'#1890ff'}} level={3} >Return Flight</Title> 
 </div>)

const style = {
  marginLeft:'0px'
};

return (
  <div>
       { 
        <div>
            <Card title={title1} style={{marginTop:'100px'}}  bordered={false}>
              <p> Departure Airport : {deptFlight.deptAirport}</p>
              <p>Arrival Airport : {deptFlight.arrAirport} </p>
              <p>Flight Date : {deptFlight.date} </p>
              <p>Departure Time : {deptFlight.deptTime} </p>
              <p>Arrival Time : {deptFlight.arrTime} </p>
              <p>Flight Price : {depPrice} </p>
              <p>Cabin Class : {cabin} </p>
              <p>Number of Adult Tickets : {nOfAdults} </p>
              <p>Number of Child Tickets : {nOfChild} </p>
            </Card>
         </div>}
         {
        <div>
            <Card title={title2} bordered={false}>
              <p>Departure Airport : {retFlight.deptAirport}</p>
              <p>Arrival Airport : {retFlight.arrAirport}</p>
              <p>Flight Date : {retFlight.date}</p>
              <p>Departure Time : {retFlight.deptTime}</p>
              <p>Arrival Time : {retFlight.arrTime}</p>
              <p>Flight Price : {retPrice}</p>
              <p>Cabin Class : {cabin}</p>
              <p>Number of Adult Tickets : {nOfAdults}</p>
              <p>Number of Child Tickets : {nOfChild}</p>
            </Card>
            <h2 style={{textAlign:'center'}}>Total Price : {depPrice+retPrice} $ </h2>
         </div>}
           {/* <Button>
              <Popconfirm title="Are you sure you want to book these flights?" onConfirm={handlerr} okText="Yes" cancelText="No" icon={<CheckOutlined style={{ color: 'red' }} />}>
                <a href="#">Confirm</a>
                </Popconfirm>
                </Button> */}
   
  </div>
    )

}
export default Summary;
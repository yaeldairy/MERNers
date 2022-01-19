import { Button, Card, Typography, Modal, Select , Popconfirm} from 'antd';
import {useState, useContext, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';
import {UserContext} from "../../Context";
import {FaPlaneDeparture} from "react-icons/fa"
import FlightInfo from './FlightInfo';
import ChooseSeats from './ChooseSeats';
import axios from 'axios';

const { Title, Text } = Typography;



function Flight (){

    const {permissionLevel, accessToken} = useContext(UserContext);

    const location = useLocation();
    const { flight } = location.state;
   
    useEffect(() => {
      console.log(flight)
      }, []);

      function handlerr()  {
        axios({
          method: 'POST',
          url: 'http://localhost:3001/admin/deleteFlight',
          headers: { Authorization: `Bearer ${accessToken}` },
          data: {
            id : flight._id
          }
        }).then((res)=>{
          window.location.href='/'
          console.log(res)
          console.log("flight deleted")          
          // console.log(res)
          // console.log("flight deleted")          

      }).catch((err)=>{
          console.log(err)
          console.log("couldn't delete flight")
      })
    }

    const title= (<div style={{ display: "flex", flexDirection :'row'}}>
      <FaPlaneDeparture style={{ fontSize: '200%' }} />
      <Title level={3} style={{ marginLeft:'20px'}}>Flight:  {flight.flightNum}</Title>
      </div>)

    // if (permissionLevel==1){
    //   return( <Button type="primary" >
    //              Update
    //           </Button> )
    // }
    return( 
        <div>
        <Card
        style={{ marginLeft:'10%' , marginRight:'10%', marginTop:'5%' }}    
        title={title}>

        <FlightInfo flight={flight}/>

       { permissionLevel==1 ?
       <div>
       <Button type="primary" ghost> <Link to={{pathname:`/updateFlight/${flight._id}`}} state={{ flight }}>Update</Link></Button>
       <Button danger style={{marginLeft:'10px'}}>
         <Popconfirm title="Are you sure you want to delete this flight?" onConfirm={handlerr} okText="Yes" cancelText="No">
           <a href="#">Delete</a>
         </Popconfirm>
       </Button>
       </div> :
       <ChooseSeats flight={flight} />
       }
        </Card>

         
       </div>)

}
export default Flight;
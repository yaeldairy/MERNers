import React, { useEffect, useState , useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { List, Typography } from 'antd';
import FlightListItem from './FlightListItem';
import {Button, Spin , Card ,Tooltip,Steps} from 'antd';
import {UserContext} from "../../Context";
import axios from 'axios';
import {FaPlaneArrival, FaPlaneDeparture} from "react-icons/fa"
const { Step } = Steps;
const { Title } = Typography;

function AlternativeFlights(){

    const location = useLocation();
    const {type, flight, seatType, Adults, Children } = location.state;
    const [flights, setFlights] = useState(UserContext);
    const [displayed, setDisplayed] =useState([])
    const [loading, setLoading]= useState(false);

     useEffect(()=>{
      setLoading(true)
      axios.get('http://localhost:3001/flights')
        .then((res) => {
          
          setFlights(res.data)
          const filteredFlights = res.data.filter((f)=>{

            if(f.arrAirport!==flight.arrAirport || f.deptAirport!== flight.deptAirport){
                return false;
            }
            switch (seatType) {
                case "First":
                    if(f.nOfFirst<(Adults+Children)){
                      return false;
                    }
                break;     
                case "Economy":
                    if(f.nOfEconomy<(Adults+Children)){
                        return false;
                      }
                break;
                 
                case "Business":
                    if(f.nOfBusiness<(Adults+Children)){
                        return false;
                      }
                break;   
              }
              return true;
         })
         setLoading(false)
         setDisplayed(filteredFlights)      
        })
        .catch((e) => {
         // setError(true) 
        })   
     },[])

     const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = (flight) => {
  
        setIsModalVisible(false);
        console.log("flight input to search")
        console.log(flight)
  
        setDisplayed(flights.filter((f)=>{
           
           console.log(flight)
  
          for (const property in flight) {
           console.log(property)
           // console.log(flight[property])
  
           if(property=="noOfAdults" || property=="noOfChildren"){
               if(f.nOfBusiness+f.nOfEconomy+f.nOfFirst < (flight.noOfAdults + flight.noOfChildren)){
                 return false;
               }
           }
          else if(property=="cabin"){

            // console.log(flight[property])
             switch(flight.cabin){
              case "First":
               // console.log((f.nOfFirst < (flight.noOfAdults + flight.noOfChildren)));
                if(f.nOfFirst < (flight.noOfAdults + flight.noOfChildren)){
                return false;}
              case "Business":
                if(f.nOfBusiness < (flight.noOfAdults + flight.noOfChildren))
                return false;
              case "Economy":
                if(f.nOfEconomy < (flight.noOfAdults + flight.noOfChildren))
                return false;         
             }
           }
          }
          return true;
  
        }))
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

     const displayFlex ={ display: "flex", direction: "row", marginTop:'10px'}
     
     const title= (input, type)=>{
       return (<div style={displayFlex}>
        {type=="departure" ? <FaPlaneDeparture style={{fontSize: '200%', color:'#1890ff'}} />:
        <FaPlaneArrival style={{fontSize: '200%', color:'#1890ff'}}/> }
        <Title style={{marginLeft:'15px', color:'#1890ff'}} level={3} >{input}</Title> 
       </div>)
     }


    return(
        <div>
  <Card title={<Title style={{marginLeft:'15px'}} level={2} >Select Return Flight</Title> } bordered={false} 
   style={{ marginLeft:'10%' , marginRight:'10%', marginTop:'5%' }}  >
        <Steps size="default" current={1}>
          <Step title="Departure Flight" />
          <Step title="Return Flight" />
          <Step title="Checkout" />
        </Steps>

        <Card title={title(`chosen ${type} flight`,type)}  style={{marginTop:'30px'}}>
        <FlightListItem flight={flight} hideButton={true} />
        </Card>
      
        <Spin spinning={loading} delay={400} >
         <Card title={title("Alternative Flights",type)} bordered={false} >
        <List
            itemLayout="vertical"
            size="large"
            pagination={{ pageSize: 5 }}
            dataSource={displayed}
            renderItem={ f => (    
            <FlightListItem flight={f} departureFlight={flight} /> )} /> 
         </Card>
         </Spin>
            
        </Card>   

        <Modal 
          title="Search Flights"
          visible={isModalVisible} 
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[ /*add modal buttons here */ ]}>
        <SearchForm handleOk={handleOk} />
      </Modal>
        </div>     
    )
}
export default AlternativeFlights;
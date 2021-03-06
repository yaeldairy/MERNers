import { Descriptions } from 'antd';

function FlightInfo ({flight}){
//TODO check what info they need here (duration, arrDate)
    return (        
        <Descriptions title="Flight Information" style={{ marginBottom:'50px'}} column={1} bordered>
        <Descriptions.Item label="Departure Airport" >
          {flight.deptAirport}
        </Descriptions.Item>
        <Descriptions.Item label="Arrival Airport" >
          {flight.arrAirport}
        </Descriptions.Item>
        <Descriptions.Item label="Duration" span>
          {flight.duration}
        </Descriptions.Item>
        <Descriptions.Item label="Departure Time" span>
          {flight.deptTime}
        </Descriptions.Item>
        <Descriptions.Item label="Arrival Time" >
          {flight.arrTime}
        </Descriptions.Item>
        <Descriptions.Item label="Firstclass Seats" >
          {flight.remainingSeats[2]}
        </Descriptions.Item>
        <Descriptions.Item label="Bussiness Seats" >
          {flight.remainingSeats[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Economy Seats" >
          {flight.remainingSeats[0]}
        </Descriptions.Item>
        <Descriptions.Item label="Baggage Allowance" >
          {flight.baggageAllowance}
        </Descriptions.Item>
        <Descriptions.Item label="Price" >
          {flight.price}
        </Descriptions.Item>
        </Descriptions>
    )
    

}
export default FlightInfo;
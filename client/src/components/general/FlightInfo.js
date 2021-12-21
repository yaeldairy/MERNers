import { Descriptions } from 'antd';

function FlightInfo ({flight}){

    return (        
        <Descriptions  title="Flight Information" column={1} bordered>
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
          {flight.nOfFirst}
        </Descriptions.Item>
        <Descriptions.Item label="Bussiness Seats" >
          {flight.nOfBusiness}
        </Descriptions.Item>
        <Descriptions.Item label="Economy Seats" >
          {flight.nOfEconomy}
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
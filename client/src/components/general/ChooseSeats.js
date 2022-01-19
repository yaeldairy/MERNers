import { Form, Select, InputNumber, Modal, Button} from 'antd';
import {useState, useContext, useEffect} from 'react';
import {  useNavigate } from "react-router-dom";
import {UserContext} from "../../Context";
const { Option } = Select;


function ChooseSeats ({flight}){

    const [form] = Form.useForm();
    let navigate = useNavigate();
    const {setCabin, setSeats } = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectValue, setSelectValue] = useState("nOfEconomy");
    const [adultsMax , setAdultsMax]= useState(0)
    const [childrenMax , setChildrenMax]= useState(0)
    const [index , setIndex]= useState(0)
    
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      const handleSubmit = async() => {
        try{
        const values = await form.validateFields();

        const {seatType, Adults, Children}=values
        setCabin(seatType);
        setSeats({number: Adults+Children , Adults, Children})
        console.log(values)
        setIsModalVisible(false);
        navigate('/returnFlights', {state :{type: 'return',flight, seatType, Adults, Children}})
        }catch(e){

        }

      };

      const onSelectChange=(value)=>{

        console.log("value")
        console.log(value)

        if(value=="Economy"){
            setSelectValue("nOfEconomy")    
            setIndex(0);
        }
        else if(value=="Business"){
            setSelectValue("nOfBusiness")
            setIndex(1);
        }else {
            setSelectValue("nOfFirst")
            setIndex(2);
        }        
      }

      const onAdultsChange= (value)=>{
          setChildrenMax(flight.remainingSeats[index]-value)
         
      }
      const onChildrenChange= (value)=>{
         setAdultsMax(flight.remainingSeats[index]-value)
      }

      useEffect(() => {

         setChildrenMax(flight.remainingSeats[index])  
         setAdultsMax(flight.remainingSeats[index])  
         form.setFieldsValue( { Adults: 1, Children:0 } )
        
        }, [selectValue]);

      

   return ( 
    <div>    
    <Button type="primary" onClick={showModal}>  Book Flight </Button> 
       
    <Modal title="Choose seats" visible={isModalVisible} 
    onOk={handleOk} 
    onCancel={handleCancel}
    footer={[
      <Button key="bookFlight" onClick={handleSubmit}>
        Book Flight
      </Button>,   
    ]}>
    <Form
    form = {form}> 

     <Form.Item
              name="seatType"
              label="Select seat type"
              rules={[
                {
                  required: true,
                  message: 'Please select seat type',
                },
              ]}
     >
    <Select
    showSearch
    placeholder="Select seat type"
    optionFilterProp="children"
    value="Economy"
    onChange={(value)=>{onSelectChange(value)}}
    >
   <Option value="First">First</Option>
   <Option value="Business">Business</Option>
   <Option value="Economy">Economy</Option>
   </Select>
   </Form.Item>
   <Form.Item
         name="Adults"
         label="Adults"
         rules={[
            {
              required: true,
              message: 'Please Specify number of adults',
            },
          ]}>
        <InputNumber onChange={(value)=>{onAdultsChange(value)}} min={1} max={adultsMax} />
    </Form.Item>
    <Form.Item
         name="Children"
         label="Children"
         rules={[
            {
              required: true,
              message: 'Please Specify number of children',
            }
          ]}>
          <InputNumber onChange={(value)=>{onChildrenChange(value)}} min={0} max={childrenMax}/>
    </Form.Item>

   </Form>
   </Modal>  
   </div>
   )
}
export default ChooseSeats;
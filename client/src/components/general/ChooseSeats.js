import { Form, Select, InputNumber, Modal, Button} from 'antd';
import {useState, useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
const { Option } = Select;


function ChooseSeats ({flight}){

    const [form] = Form.useForm();
    let navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectValue, setSelectValue] = useState("nOfEconomy");
    const [adultsMax , setAdultsMax]= useState(0)
    const [childrenMax , setChildrenMax]= useState(0)
    const [seatNumbers, setSeatNumbers] =useState(flight[selectValue])

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
        console.log(values)
        setIsModalVisible(false);
        navigate('/returnFlights')
        }catch(e){

        }

      };

      const onSelectChange=(value)=>{

        console.log("value")
        console.log(value)

        if(value=="Economy"){
            setSelectValue("nOfEconomy")    
        }
        else if(value=="Business"){
            setSelectValue("nOfBusiness")
        }else {
            setSelectValue("nOfFirst")
        }        
      }

      const onAdultsChange= (value)=>{
          setChildrenMax(flight[selectValue]-value)
         
      }
      const onChildrenChange= (value)=>{
         setAdultsMax(flight[selectValue]-value)
      }

      useEffect(() => {

         setChildrenMax(flight[selectValue])  
         setAdultsMax(flight[selectValue])  
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
   // onFinish={onFinish}
   // onFinishFailed={onFinishFailed}
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
    defaultValue="Economy"
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
          <InputNumber  onChange={(value)=>{onChildrenChange(value)}} min={0} max={childrenMax}/>
    </Form.Item>

   </Form>
   </Modal>  
   </div>
   )
}
export default ChooseSeats;
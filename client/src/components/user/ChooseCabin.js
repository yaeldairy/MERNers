import { Form, Select, InputNumber, Modal, Button } from 'antd';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";
import ChangeCheckout from './ChangeCheckout';
const { Option } = Select;


function ChooseCabin({ data }) {
    const { oldFlight, oldUserFlight, newFlight, cabin, type, pricediff } = data;

    const [form] = Form.useForm();
    let navigate = useNavigate();
    const { setCabin, setSeats } = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectValue, setSelectValue] = useState("nOfEconomy");
    // const [adultsMax , setAdultsMax]= useState(0)
    // const [childrenMax , setChildrenMax]= useState(0)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        return <ChangeCheckout oldFlight={oldFlight} oldUserFlight={oldUserFlight} newFlight={newFlight} cabin={cabin} type={type} pricediff={pricediff} />//return

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const { cabin } = values
            setCabin(cabin);
            // setSeats({number: Adults+Children , Adults, Children})
            console.log(values)
            setIsModalVisible(false);
            // navigate('/returnFlights', {state :{type: 'return',flight, seatType, Adults, Children}})
        } catch (e) {

        }

    };

    const onSelectChange = (value) => {

        console.log("value")
        console.log(value)
        setSelectValue(value)
        // if (value == "Economy") {
        //     setSelectValue(value)
        // }
        // else if (value == "Business") {
        //     setSelectValue("nOfBusiness")
        // } else {
        //     setSelectValue("nOfFirst")
        // }
    }

    // const onAdultsChange = (value) => {
    //     setChildrenMax(flight[selectValue] - value)

    // }
    // const onChildrenChange = (value) => {
    //     setAdultsMax(flight[selectValue] - value)
    // }

    // useEffect(() => {

    // setChildrenMax(flight[selectValue])
    // setAdultsMax(flight[selectValue])
    // form.setFieldsValue({ Adults: 1, Children: 0 })

    // }, [selectValue]);




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
                    form={form}>

                    <Form.Item
                        name="cabin"
                        label="Select cabin"
                        rules={[
                            {
                                required: true,
                                message: 'Please select cabin',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select cabin"
                            // optionFilterProp="children"
                            value="Economy"
                            onChange={(value) => { onSelectChange(value) }}
                        >
                            <Option value="First">First</Option>
                            <Option value="Business">Business</Option>
                            <Option value="Economy">Economy</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default ChooseCabin;
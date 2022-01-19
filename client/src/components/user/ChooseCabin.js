import { Form, Select, InputNumber, Modal, Button } from 'antd';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";
import ChangeCheckout from './ChangeCheckout';
const { Option } = Select;


function ChooseCabin({ oldFlight, oldUserFlight, newFlight, type, price }) {
    const [form] = Form.useForm();
    let navigate = useNavigate();
    // const { setCabin, setSeats } = useContext(UserContext);
    const [cabin, setCabin] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [selectValue, setSelectValue] = useState();

    const showModal = () => {
        setIsModalVisible(true);
    };

    // const handleOk = () => {
    //     setIsModalVisible(false);

    // };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    var plus = oldFlight.price;
    const CalPrice = (price) => {
        if (oldUserFlight.cabin == "First")
            plus += 200;
        else if (oldUserFlight.cabin == "Business")
            plus += 100
            
        console.log(newFlight.price * oldUserFlight.noOfSeats.number);
        console.log(plus * oldUserFlight.noOfSeats.number);
        switch (cabin) {
            case "First":
                // console.log("price: " + ((newFlight.price + 200) * oldUserFlight.noOfSeats.number) - (plus * oldUserFlight.noOfSeats.number))
                return ((newFlight.price + 200) * oldUserFlight.noOfSeats.number) - (plus * oldUserFlight.noOfSeats.number)
            case "Business":
                // console.log("price: " + (newFlight.price * oldUserFlight.noOfSeats.number) - ((oldFlight.price + 100) * oldUserFlight.noOfSeats.number))
                return ((newFlight.price + 100) * oldUserFlight.noOfSeats.number) - (plus * oldUserFlight.noOfSeats.number)
            case "Economy":
                // console.log("price: " + (newFlight.price * oldUserFlight.noOfSeats.number) - (oldFlight.price * oldUserFlight.noOfSeats.number))
                return (newFlight.price * oldUserFlight.noOfSeats.number) - (plus * oldUserFlight.noOfSeats.number)
            default:
                return 0;
            // return flight.price - (price * seats)||0;//revisit- adjust to cabin type
        }
    }
    const handleSubmit = async () => {
        try {
            // const values = await form.validateFields();
            // setCabin(selectValue);
            console.log(cabin);
            setIsModalVisible(false);
            // return <ChangeCheckout  />//return
            navigate(`/changeCheckout`, { state: { oldFlight: oldFlight, oldUserFlight: oldUserFlight, newFlight: newFlight, cabin: cabin, type: type, pricediff: CalPrice(price) } })
        } catch (e) {

        }

    };

    const onSelectChange = (value) => {
        setCabin(value)
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}> Book Flight </Button>

            <Modal title="Choose seats" visible={isModalVisible}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="bookFlight" onClick={handleSubmit}>
                        Book Flight
                    </Button>
                ]}>
                <Form
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
import React, { useState, useEffect} from 'react'
import { message} from 'antd';
import '../../App.css';

function SeatButton(props) {
    let takenSeats = props.takenSeats 
    const [buttonState, setButtonState] = useState(props.initialClass)
    useEffect(() => {
        if (props.totalSeats == 0){
            setButtonState('seat nCSeat')
        }
        else if (buttonState == 'seat availableSeat' && takenSeats.includes(props.id) && !(props.initialSeats).includes(props.id))
            setButtonState('seat unavailableSeat')
        else if ((props.initialSeats).includes(props.id))
            setButtonState('seat selectedSeat')
    }, [])
    
    function handler(event) {
        if (props.remainingSeats == 0 && buttonState =='seat availableSeat'){
            if(props.totalSeats == 1){
                message.warning('Kindly deselect the selected seat first');
            }
            else{
                message.warning('Kindly deselect an unwanted selected seat first');
            }
        }
        else{
        if (buttonState == 'seat availableSeat' && props.remainingSeats > 0) {
            setButtonState('seat selectedSeat')
            props.addSeat(event.target.id)
        }
        else if (buttonState == 'seat selectedSeat') {
            setButtonState('seat availableSeat')
            props.removeSeat(event.target.id)
        }
    }
        
    }

    return (
        <button id={props.id} onClick={handler} className={buttonState}></button>
    )
}

export default SeatButton

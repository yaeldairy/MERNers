import React from 'react'
import { Card } from 'antd';
import '../App.css';

function SSLegend() {
    return (
        <div className='seatMap'>
            <Card style={{ width: 200 }} bordered={false}>
            <div className='legendRow'>
                <div>
                    <button className='seat legendSeat'>A</button>
                    <button className='seat legendSeat'>C</button>
                </div>
                <div>
                    <button className='seat legendSeat'>D</button>
                    <button className='seat legendSeat'>F</button>
                </div>
            </div>

            <div className='legendRow'>
                <div>
                    <button className='seat legendSeat'>A</button>
                    <button className='seat legendSeat'>B</button>
                    <button className='seat legendSeat'>C</button>
                </div>
                <div>
                    <button className='seat legendSeat'>D</button>
                    <button className='seat legendSeat'>E</button>
                    <button className='seat legendSeat'>F</button>
                </div>
            </div>
            </Card>
        </div>
    )
}

export default SSLegend

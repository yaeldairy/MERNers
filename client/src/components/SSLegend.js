import React from 'react'
import { Card } from 'antd';
import '../App.css';

function SSLegend() {
    return (
        <div className='legendLayout'>
            <div>
                <p className='legendText'>Legend</p>
                <div className='seatColorGuideLayout'>

                    <div className='colorGuideSeats'>
                        <button className='seat legendSelected'></button>
                        &nbsp; Selected
                    </div>
                    <div className='colorGuideSeats'>
                        <button className='seat legendAvailable'></button>
                        &nbsp; Available
                    </div>
                    <div className='colorGuideSeats'>
                        <button className='seat unavailableSeat'></button>
                        &nbsp; Unavailable
                    </div>
                    <div className='colorGuideSeats'>
                        <button className='seat nCSeat'></button>
                        &nbsp; Non-compliant
                    </div>
                </div>
            </div>

            <div className='seatMap legend'>

                <div className='legendRow'>
                    <div>
                        <button className='seat legendSeatFadingTop'></button>
                        <button className='seat legendSeatFadingTop'></button>
                    </div>
                    <div>
                        <button className='seat legendSeatFadingTop'></button>
                        <button className='seat legendSeatFadingTop'></button>
                    </div>
                </div>
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
                <div><p></p></div>
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
                <div className='legendRow'>
                    <div>
                        <button className='seat legendSeatFadingBottom'></button>
                        <button className='seat legendSeatFadingBottom'></button>
                        <button className='seat legendSeatFadingBottom'></button>
                    </div>
                    <div>
                        <button className='seat legendSeatFadingBottom'></button>
                        <button className='seat legendSeatFadingBottom'></button>
                        <button className='seat legendSeatFadingBottom'></button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SSLegend

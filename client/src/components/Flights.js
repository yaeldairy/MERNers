import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Flights (){

    const [flights, setFlights]= useState(null);
    const [error, setError]= useState(false)

    useEffect(() => {
   
        axios.get('http://localhost:3001/admin/flights')
          .then((res) => {
            setFlights(res.date)
            
          })
          .catch((e) => {
            setError(true)
    
          })
    
      }, []);

      return (
          <h1>Hello</h1>
      )

    
     
}

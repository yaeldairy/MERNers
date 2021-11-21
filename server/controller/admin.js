const Flight = require ('../db/models/flight');
const mongoose= require('mongoose');

exports.allFlights = (req, res)=> {

    Flight.find({},(error, response)=>{

        if (response){
            res.status(200).send(response)
        }
        else{
            res.status(400).send(error)
        }
        

    })
    
}
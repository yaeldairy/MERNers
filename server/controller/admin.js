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

//TODO make sure the catching is correct
exports.insertFlight = (req, res) => {
    Flight.createFlight(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        })
        .catch((err)=>{
            res.status(300).send(err.message);
        })
};


 
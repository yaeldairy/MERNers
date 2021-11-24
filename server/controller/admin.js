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

exports.updateFlight =(req,res)=> {

    const {_id,flightNum,deptAirport,arrAirport,deptTime,arrTime,date,nOfEconomy,nOfBusiness} = req.body;
    console.log(req.body);
    var objectId = mongoose.Types.ObjectId(_id);
    console.log(objectId);


    Flight.findByIdAndUpdate(objectId,{flightNum,deptAirport,arrAirport,deptTime,arrTime,date,nOfEconomy,nOfBusiness},(error, response)=>{
        if (response){
            res.status(200).send(response)
        }
        else{
            res.status(400).send(error)
        }
    })
}

exports.deleteFlight =(req,res)=> {

    const {id } = req.body;
    console.log(id)
    var objectId = mongoose.Types.ObjectId(id);
    Flight.findByIdAndDelete(objectId,(error, response)=>{
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


 

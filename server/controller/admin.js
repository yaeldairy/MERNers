const Flight = require ('../db/models/flight');
//const mongoose= require('mongoose');
var mongoose = require('mongoose');

exports.allFlights = (req, res)=> {
    
    Flight.find({},(error, response)=>{
        if (response){
            res.status(200).send(res)
        }
        else{
            res.status(400).send(err)
        }
        

    })


}

exports.updateFlight =(req,res)=> {

    const {id,flightNum,deptAirport,arrAirport,deptTime,arrTime,date,nOfEconomy,nOfBusiness} = req.body;
    console.log(req.body);
    var objectId = mongoose.Types.ObjectId(id);
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


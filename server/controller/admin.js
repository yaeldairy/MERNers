const Flight = require ('../db/models/flight');
const mongoose= require('mongoose');


exports.testRoute = (req, res) => {
   
    console.log("req.body.user on next print")
    
    console.log(req.body.user)

    return res.status(200).send("test route succesfull");

 
  };




exports.updateFlight =(req,res)=> {

    const {_id,flightNum,deptAirport,arrAirport,deptTime,arrTime,duration,date,arrDate,nOfEconomy,nOfBusiness, nOfFirst, price, remainingSeats} = req.body.flightData;
    console.log(req.body);
    console.log("FLIGHT DATA");
    console.log(req.body.flightData);
    var objectId = mongoose.Types.ObjectId(_id);
    // console.log(objectId);


    Flight.findByIdAndUpdate(objectId,{flightNum,deptAirport,arrAirport,deptTime,arrTime,duration,date,arrDate,nOfEconomy,nOfBusiness, nOfFirst,price, remainingSeats},(error, response)=>{
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
    // console.log(id)
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
 createFlight = (flightData) => {
    const flight = new Flight(flightData);
    return flight.save();
};

exports.insertFlight = (req, res) => {
    createFlight(req.body.flightData)
        .then((result) => {
            res.status(201).send({id: result._id});
        })
        .catch((err)=>{
            res.status(300).send(err.message);
        })
};


 
const Flight = require ('../db/models/flight');
const mongoose= require('mongoose');
const User = require('../db/models/user')



exports.addFlight =async(req,res)=> {

    const {username}=req.body.user;
    const {_id,flightNum,deptAirport,arrAirport,deptTime,arrTime,date,totalPrice,noOfSeats,cabin,bookingNumber} = req.body.flight;
    const FId = mongoose.Types.ObjectId(_id);
    const flight ={flightId:FId,flightNum,deptAirport,arrAirport,deptTime,arrTime,date,totalPrice,noOfSeats,cabin,bookingNumber,seat:[]};

   

    User.findOneAndUpdate({username},{$push:{flights:flight}},(error,response)=>{
        if(response){
            res.status(200).send(response)
        }
        else{
           
            res.status(400).send(error)
        }
    })

}


exports.updateSeats=(req,res)=>{
    const{flightId,nOfEconomy,nOfBuisness,nOfFirst}=req.body;
    var fId = mongoose.Types.ObjectId(flightId);
    Flight.findOneAndUpdate({_id:fId},{nOfEconomy:nOfEconomy , nOfBuisness:nOfBuisness , nOfFirst:nOfFirst},(error,response)=>{
        if(response){
            res.status(200).send(response);
        }
        else{
            res.status(400).send(error);
        }
    })
}

let patchUser = (id, newUserData) => {
    return User.findOneAndUpdate({
        _id: id
    }, newUserData);
};
exports.selectSeats = (req,res) => {
    let data = req.body
    User.findById(data.userId)
    .then((result)=>{
        let flightsArray = result.flights
        let flightIndex = flightsArray.findIndex(
            (flight) => (flight.flightId).toString() === data.flightId)
        let currentFlight = flightsArray[flightIndex];
        currentFlight.seat = data.seats
        flightsArray[flightIndex] = currentFlight
        let finalFlightsObject = {flights : flightsArray}
        patchUser(data.userId, finalFlightsObject)
        .then((result) => {
            res.status(204).send({});
        });
    }
    )
}

// exports.addBooking=(req,res)=>{
//     const {_id,bookingNum} = req.body;
//     console.log(_id);
//     User.findByIdAndUpdate(_id,{$push:{bookingReference:bookingNum}},(error,response)=>{
//         if(response){
//             res.status(200).send(response);
//         }
//         else{
//             res.status(400).send(error);
//         }
//     })

// }

exports.testRoute = (req, res) => {
   
    console.log("req.body.user on next print")
    
    console.log(req.body.user)

    return res.status(200).send("test route succesfull");

 
  };
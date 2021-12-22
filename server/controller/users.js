const User = require ('../db/models/user');
const mongoose= require('mongoose');
const Flight = require ('../db/models/flight');


//assuming the request carries and object with both the unique user ID
//and the seat array
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

exports.addBooking=(req,res)=>{
    const {_id,bookingNum} = req.body;
    var userId = mongoose.Types.ObjectId(_id);
    User.findOneAndUpdate({_id:userId},{$push:{bookingReferences:bookingNum}},(error,response)=>{
        if(response){
            res.status(200).send(response);
        }
        else{
            res.status(400).send(error);
        }
    })

}

exports.getProfile = (req, res) => {
    // var objectId = mongoose.Types.ObjectId(req.body.username);

    Users.findOne({username: req.body.user.username}, (error, response) => {

        if (response) {
            res.status(200).send(response)
        }
        else {
            res.status(400).send(error)
        }
    })

}

exports.updateProfile = (req, res) => {

    const { _id,password, firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber} = req.body;
    var objectId = mongoose.Types.ObjectId(_id);

    User.findByIdAndUpdate(objectId, {password, firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber}, (error, response) => {
        if (response) {
            res.status(200).send(response)
        }
        else {
            res.status(400).send(error)
        }
    })
}

exports.cancelFlight = (req, res) => {

    const { uId,booking } = req.body;
    var userId = mongoose.Types.ObjectId(uId);
    User.findOneAndUpdate(
        { _id: userId },
        { $pull: { flights: {bookingNum: { $in: [booking] }}, bookingReferences: booking } }
    )
        .catch(err => {
            console.log("error")
            console.log(err);
        });
}

exports.testRoute = (req, res) => {
   
    console.log("req.body on next print")
    
    console.log(req.body)

    return res.status(200).send("test route succesfull");

 
  };
  

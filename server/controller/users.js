const User = require ('../db/models/user');
const mongoose= require('mongoose');


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
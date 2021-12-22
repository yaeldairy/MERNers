const User = require('../db/models/user');
const Flight = require('../db/models/flight');
const mongoose = require('mongoose');



//assuming the request carries and object with both the unique user ID
//and the seat array
let patchUser = (id, newUserData) => {
    return User.findOneAndUpdate({
        _id: id
    }, newUserData);
};

let patchFlight = (id, updatedTakenSeats) => {
    return Flight.findOneAndUpdate({
        _id: id
    }, updatedTakenSeats);
};
exports.selectSeats = (req, res) => {
    let data = req.body
    User.findById(data.userId)
        .then((result) => {
            let flightsArray = result.flights
            let flightIndex = flightsArray.findIndex(
                (flight) => (flight.flightId).toString() === data.flightId)
            let currentFlight = flightsArray[flightIndex];
            currentFlight.seat = data.seats
            flightsArray[flightIndex] = currentFlight
            let finalFlightsObject = { flights: flightsArray }
            patchUser(data.userId, finalFlightsObject)
                .then((result) => {
                    Flights.findById(data.flightId)
                        .then((result) => {
                            let currentlyTakenSeats = result.takenSeats
                            currentlyTakenSeats.concat(data.seats)
                            let updatedTakenSeats = { takenSeats: currentlyTakenSeats }
                            patchFlight(data.flightId, updatedTakenSeats)
                                .then((result) => {
                                    res.status(204).send({});
                                })
                                .catch((err)=>{
                                    console.log('Unexpected Internal Error')
                                })
                        })
                })
                .catch((err) => {
                    res.status(400).send({});
                })
        }
        )
}


exports.testRoute = (req, res) => {

    console.log("req.body on next print")

    console.log(req.body)

    return res.status(200).send("test route succesfull");


};
exports.addFlight = async (req, res) => { //TODO check what info they need here (duration, arrDate)

    const { username } = req.body.user;
    const { _id, flightNum, deptAirport, arrAirport, deptTime, arrTime, date, totalPrice, noOfSeats, cabin, bookingNumber } = req.body.flight;
    const FId = mongoose.Types.ObjectId(_id);
    const flight = { flightId: FId, flightNum, deptAirport, arrAirport, deptTime, arrTime, date, totalPrice, noOfSeats, cabin, bookingNumber, seat: [] };



    User.findOneAndUpdate({ username }, { $push: { flights: flight } }, (error, response) => {
        if (response) {
            res.status(200).send(response)
        }
        else {

            res.status(400).send(error)
        }
    })

}

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
flightNum: {
    type:String, //incase the flight number is A123 for ex.
    required: true
},

deptAirport: {
    type:String,
    required: true
},
arrAirport: {
    type:String,
    required: true
},
deptTime: {
    type:String,
    required: true
},
arrTime: {
    type:String,
    required: true
},
duration:{
    type:String,
    required: true
},
date: {
    type:String, //manipulating date datatype is complex, change if needed
    required: true
},
nOfEconomy: {
    type:Number,
    required: true
},
nOfBusiness: {
    type:Number,
    required: true
},
nOfFirst: {
    type:Number,
    required: true
},
price :{
    type:Number,
    required: true

}

})
const Flight = mongoose.model('Flight',flightSchema);

//For cleanliness, this is a method that takes data and creates a flight
//TODO do I need to handle anything here?
// exports.createFlight = (flightData) => {
//     const flight = new Flight(flightData);
//     return flight.save();
// };


 //this variable now represents an instance of the collection (the one in the DB)
// we'll be able to use this variable to pass things into db and get things from DB
module.exports = Flight;
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
}

})

const Flight = mongoose.model('Flight',flightSchema); //this variable now represents an instance of the collection (the one in the DB)
// we'll be able to use this variable to pass things into db and get things from DB
module.exports = Flight;
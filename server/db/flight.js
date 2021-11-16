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

const Flight = mongoose.model('Flight',flightSchema);
module.exports = Flight;
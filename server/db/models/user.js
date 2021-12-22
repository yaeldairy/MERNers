const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

    const userSchema = new Schema({

        username: {
            type:String, 
            required: true
        },
        password: {
            type:String, 
            required: true
        },
        firstName: {
            type:String, 
            required: true
        },
        lastName: {
            type:String, 
            required: true
        }, 
        homeAddress: {
            type:String, 
            required: true
        },
        countryCode: {
            type:String, 
            required: true
        },
        phoneNumber: {
            type:String, 
            required: true
        }, 
        email: {
            type:String, 
            required: true
        },
        passportNumber: {
            type:String, 
            required: true
        },
        bookingReferences:{
            type:[],
            required:true
        },
        flights: {
            type:[],
            required: true
        }
    
    } )



const User = mongoose.model('User', userSchema);
module.exports = User;
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
    fName: {
        type:String, 
        required: true
    },
    lName: {
        type:String, 
        required: true
    }, 
    homeAddress: {
        type:String, 
        required: true
    },
    cCode: {
        type:String, 
        required: true
    },
    phoneNum: {
        type:String, 
        required: true
    },
    phoneNum2: {
        type:String},  
    email: {
        type:String, 
        required: true
    },
    passportNum: {
        type:String, 
        required: true
    }

}
)

const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type:String, //incase the flight number is A123 for ex.
        required: true
    },
    password: {
        type:String, //incase the flight number is A123 for ex.
        required: true
    }

})

const User = mongoose.model('User', userSchema);
module.exports = User;
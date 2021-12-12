var jwt = require('jsonwebtoken');
const User = require ('../db/models/user');
const mongoose= require('mongoose');
const bcrypt = require ('bcrypt');

 


exports.login = (req, res) => {
    
    var token = jwt.sign(req.body, process.env.SECRET);
    console.log(token)
    res.status(201).send({accessToken: token});

 };



createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.insertUser = (req, res) => {
    const {username, fName, lName, homeAddress, cCode, phoneNum, phoneNum2, email, passportNum} =req.body
    let newUser;
    const bcrypt = require('bcrypt');
    bcrypt.hash(req.body.password, 10)
    .then((result)=>{
         newUser ={username,password:result, fName, lName, homeAddress, cCode, phoneNum, phoneNum2, email, passportNum}
         createUser(newUser)
        .then((result) => {
            res.status(201).send({id: result._id});
        })
        .catch((err)=>{
            res.status(300).send(err.message);
        })
        })
    .catch((err)=>{
        console.log('error')
    })
    
};

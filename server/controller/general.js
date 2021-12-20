const jwt = require('jsonwebtoken');
const User = require ('../db/models/user');
const mongoose= require('mongoose');
const bcrypt = require ('bcrypt');
const Flight = require ('../db/models/flight');

 createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.insertUser = (req, res) => {
  let { username,
    password,
    firstName,
    lastName, 
    homeAddress,
    countryCode,
    phoneNumber, 
    email,
    passportNumber}  = req.body;
    let newUser;
    console.log("Password")
    console.log(req.body.password)
    const bcrypt = require('bcrypt');

    bcrypt.hash(password, 10)

    .then((result)=>{
         newUser ={ username,
            password: result,
            firstName,
            lastName, 
            homeAddress,
            countryCode,
            phoneNumber, 
            email,
            passportNumber,
        flights:[]}
         createUser(newUser)
        .then((result) => {
            res.status(201).send({id: result._id});
        })
        .catch((err)=>{
            res.status(300).send(err.message);
        })
        })
    .catch((err)=>{
        console.log(err)
        res.status(400).send(err);
    })
    
};


exports.login = (req, res) => {
    
    const accessToken = jwt.sign(req.body, "SECRET", { expiresIn: "1d" });

    const refreshToken = jwt.sign(req.body, "SECRET", { expiresIn: "1d" });

   const {permissionLevel}= req.body

   return res.status(201).send({ permissionLevel, accessToken, refreshToken});

 };

 exports.allFlights = (req, res)=> {
    
    Flight.find({},(error, response)=>{

        if (response){      
            res.status(200).send(response)
        }
        else{
            res.status(400).send(error)
        }
    })
    
}


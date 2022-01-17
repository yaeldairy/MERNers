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

   const {username, permissionLevel}= req.body

   return res.status(201).send({username, permissionLevel, accessToken, refreshToken});

 };

exports.isCorrectPassword=(req,res,next)=>{

    const {username, oldPassword, newPassword }=req.body;

    User.find({username}, async (error, response)=>{

        console.log(response)
        console.log(error)

        if (response){  

            const matched = await bcrypt.compare(oldPassword, response[0].password );
        
            if(matched){
                return next();       
            } else{ 
                return res.status(400).send({errors: ['wrong password']});

            }                             
        } 
    })

}
exports.changePassword =(req,res)=>{

    const {username, oldPassword, newPassword }=req.body;

    console.log(req.body)
    
   

    bcrypt.hash(newPassword, 10)

    .then((result)=>{

        User.findOneAndUpdate({username}, { $set: {password: result} },(error, response)=>{

            if (response){      
                res.status(200).send(["success change in password", response])
            }
            else{
                res.status(400).send(["database error",error] )
            }
        })}
    )
    .catch((err)=>{
        res.status(400).send(err)
       
    })


}

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


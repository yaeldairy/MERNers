<<<<<<< HEAD
const User = require ('../db/models/user');
const Admin = require ('../db/models/admin');
const bcrypt = require ('bcrypt');
const { Error } = require('mongoose');


exports.isPasswordAndUserMatch = async (req, res, next) => {

    console.log(req.body)
    
    const {username, password } =req.body;


    User.find({ username: username }, async (error, response)=>{

        console.log(response)
        console.log(error)

        if (response){  

            const matched = await bcrypt.compare(password , response[0].password );

            if(matched){
              
                req.body = {
                    username ,
                    email: response[0].email,
                    permissionLevel: 2,
                };   
               
                return next();    
            } 
            return res.status(400).send({errors: ['Invalid username or password']});
                               
        } 
    })

    Admin.find({ username: username }, async (error, response) =>{

        console.log(response)
        console.log(error)

        if (response){   

            const matched = await bcrypt.compare(password , response[0].password );

            if(matched){

                req.body = {
                    username,
                    email: response[0].email,
                    permissionLevel: 1,
                };   

                return next();    
            } 
            return res.status(400).send({errors: ['Invalid username or password']});
        } 
    }) 
       
 };
=======
const User = require ('../db/models/user');
const config = require ('../auth/config');

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + config.userSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, config.userSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({accessToken: token, refreshToken: refresh_token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
 };

exports.isPasswordAndUserMatch = (req, res, next) => {

    const {username, password }=req.body;

    User.find({ username: username },(error, response)=>{

        if (response){  
            
            if(response[0].password==password){ 

                req.body = {
                    user: username ,
                    email: response[0].email,
                    permissionLevel: 2,
                };   

                return next();          
            }      
            return res.status(400).send({errors: ['Invalid email or password']});
        } 
        return res.status(401).send({errors: ['unable to reach server']});
    })


 };
>>>>>>> feature/userProfile

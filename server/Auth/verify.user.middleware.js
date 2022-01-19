const User = require ('../db/models/user');
const Admin = require ('../db/models/admin');
const bcrypt = require ('bcrypt');
const { Error } = require('mongoose');


exports.isPasswordAndUserMatch = async (req, res, next) => {

    console.log(req.body)
    
    const {username, password } =req.body;


    User.find({ username: username }, async (error, response)=>{

         console.log(response)
        // console.log(error)
        if (response){  
            if(response.length==0){
                return res.status(400).send({errors: ['Invalid username or password']});
            }
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

 
       
 };
 exports.isPasswordAndAdminMatch = async (req, res, next) => {

    console.log(req.body)
    
    const {username, password } =req.body;

    Admin.find({ username: username }, async (error, response) =>{

        console.log(response)
        console.log(error)

        if (response){  
            
            if(response.length==0){
                return res.status(400).send({errors: ['Invalid username or password']});
            }

            console.log(response);
            console.log(response[0].password);
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


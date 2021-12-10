const User = require ('../db/models/user');


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
const Users = require ('../db/models/users');
const mongoose= require('mongoose');

exports.getProfile = (req, res)=> {
    // const {_id} = req.body;
    var objectId = mongoose.Types.ObjectId(req.body);
    
    Users.findById(objectId, (error, response)=>{

        if (response){      
            res.status(200).send(response)
        }
        else{
            res.status(400).send(error)
        }
    })
    
}

exports.updateProfile =(req,res)=> {

    const {_id, firstName, lastName, email, purchases} = req.body;
    var objectId = mongoose.Types.ObjectId(_id);

    Users.findByIdAndUpdate(objectId,{firstName, lastName, email, purchases},(error, response)=>{
        if (response){
            res.status(200).send(response)
        }
        else{
            res.status(400).send(error)
        }
    })
}
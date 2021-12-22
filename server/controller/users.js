const User = require ('../db/models/user');
const mongoose=require('mongoose')

exports.testRoute = (req, res) => {
   
    console.log("req.body on next print")
    
    console.log(req.body)

    return res.status(200).send("test route succesfull");

 
  };
  exports.addFlight =async(req,res)=> {

    const {username}=req.body.user;
    const {_id,flightNum,deptAirport,arrAirport,deptTime,arrTime,date,totalPrice,noOfSeats,cabin,bookingNumber} = req.body.flight;
    const FId = mongoose.Types.ObjectId(_id);
    const flight ={flightId:FId,flightNum,deptAirport,arrAirport,deptTime,arrTime,date,totalPrice,noOfSeats,cabin,bookingNumber,seat:[]};

   

    User.findOneAndUpdate({username},{$push:{flights:flight}},(error,response)=>{
        if(response){
            res.status(200).send(response)
        }
        else{
           
            res.status(400).send(error)
        }
    })

}

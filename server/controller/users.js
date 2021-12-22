const User = require ('../db/models/user');
const mongoose= require('mongoose');


//assuming the request carries and object with both the unique user ID
//and the seat array
 let patchUser = (id, newUserData) => {
    return User.findOneAndUpdate({
        _id: id
    }, newUserData);
};
exports.selectSeats = (req,res) => {
    let data = req.body
    User.findById(data.userId)
    .then((result)=>{
        let flightsArray = result.flights
        let flightIndex = flightsArray.findIndex(
            (flight) => (flight.flightId).toString() === data.flightId)
        let currentFlight = flightsArray[flightIndex];
        currentFlight.seat = data.seats
        flightsArray[flightIndex] = currentFlight
        let finalFlightsObject = {flights : flightsArray}
        patchUser(data.userId, finalFlightsObject)
        .then((result) => {
            res.status(204).send({});
        });
    }
    )
}


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

exports.getProfile = (req, res) => {
    // var objectId = mongoose.Types.ObjectId(req.body.username);

    User.findOne({username: req.body.user.username}, (error, response) => {

        if (response) {
            res.status(200).send(response)
        }
        else {
            res.status(400).send(error)
        }
    })

}

exports.updateProfile = (req, res) => {

    const { _id, username,password, firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber } = req.body;
    var objectId = mongoose.Types.ObjectId(_id);

    User.findByIdAndUpdate(objectId, { username,password, firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber }, (error, response) => {
        if (response) {
            res.status(200).send(response)
        }
        else {
            res.status(400).send(error)
        }
    })
}


exports.cancelFlight = (req, res) => {

    const { uId,booking } = req.body;
    var userId = mongoose.Types.ObjectId(uId);
    User.findOneAndUpdate(
        { _id: userId },
        { $pull: { flights: {bookingNum: { $in: [booking] }}, bookingReferences: booking } }
    )
        .catch(err => {
            console.log("error")
            console.log(err);
        });
}

exports.sendEmail = (req, res) => {
    const { email, emailBody } = req.body;

    // const emailBody = `<p>Hello ${userData.firstname} ${userData.lastname},</p>
    //     <br/>
    //     <p>This is to confirm the cancellation of your reservation for booking ${booking}, flights ${deptFlight.flightNumber} and ${retFlight.flightNumber}. You will be refunded with an amount of ${amount} within the next 5-7 working days.</p>
    //     <br/>
    //     <p>Best wishes,</p>
    //     <p>ACL Airlines</p>`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // host: "smtp-mail.outlook.com",
        // secureConnection: true, 
        // port: 587,
        auth: {
            user: "aclairlines@gmail.com",
            // user: "aclairlines@outlook.com",
            pass: "ACLairline2021"
        },
        tls: {
            rejectUnauthorized: false
        }
    }
    );

    let mailOptions = {
        // from: '"ACL Airlines" <aclairlines@outlook.com>',
        from: '"ACL Airlines" <aclairlines@gmail.com>', 
        to: email,
        subject: "ACL Airlines notification",
        html: emailBody,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("error", err);
        } else {
            console.log("success");
        }
    });
}


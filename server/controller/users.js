const Users = require('../db/models/user');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

exports.getProfile = (req, res) => {
    // var objectId = mongoose.Types.ObjectId(req.body.username);

    Users.findOne({username: req.body.user.username}, (error, response) => {

        if (response) {
            res.status(200).send(response)
        }
        else {
            res.status(400).send(error)
        }
    })

}

exports.updateProfile = (req, res) => {

    const { _id, username,password, firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber, bookingReferences, flights } = req.body;
    var objectId = mongoose.Types.ObjectId(_id);

    Users.findByIdAndUpdate(objectId, { username,password, firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber, bookingReferences, flights }, (error, response) => {
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
    Users.update(
        { _id: userId },
        { $pull: { flights: {bookingNum: { $in: [ booking ] }}, bookingReferences: booking } }
    )
        .then(err => {
            console.log("error");
        });
}

exports.sendEmail = (req, res) => {
    const { userData, booking, deptFlight, retFlight, amount } = req.body;

    const emailBody = `<p>Hello ${userData.firstname} ${userData.lastname},</p>
        <br/>
        <p>This is to confirm the cancellation of your reservation for booking ${booking}, flights ${deptFlight.flightNumber} and ${retFlight.flightNumber}. You will be refunded with an amount of ${amount} within the next 5-7 working days.</p>
        <br/>
        <p>Best wishes,</p>
        <p>ACL Airlines</p>`;

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
        to: "y.aeldairy@gmail.com",
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

// exports.addFlight =async(req,res)=> {

//     const {_id,booking,
//         flightId1,flightNum1,deptAirport1,arrAirport1,deptTime1,arrTime1,date1,seat1,cabin1,
//         flightId2,flightNum2,deptAirport2,arrAirport2,deptTime2,arrTime2,date2,seat2,cabin2,
//         totalPrice} = req.body;
//     var userId = mongoose.Types.ObjectId(_id);
//     var fId1 = mongoose.Types.ObjectId(flightId1);
//     var fId2 = mongoose.Types.ObjectId(flightId2);
//     User.findOneAndUpdate({_id: userId},
//         {$push:{flights:{booking: booking,deptFlight:
//             {flightId:fId1,flightNumber:flightNum1,deptAirport:deptAirport1,arrAirport:arrAirport1,deptTime:deptTime1,arrTime:arrTime1,date:date1,seat:seat1,cabinClass:cabin1},
//             retFlight:
//             {flightId:fId2,flightNumber:flightNum2,deptAirport:deptAirport2,arrAirport:arrAirport2,deptTime:deptTime2,arrTime:arrTime2,date:date2,seat:seat2,cabinClass:cabin2},
//                 totalPrice:totalPrice}}},(error,response)=>{
//         if(response){
//             res.status(200).send(response)
//         }
//         else{
//             res.status(400).send(error)
//         }
//     })
// }


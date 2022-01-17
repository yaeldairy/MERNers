require('dotenv').config()
const User = require('../db/models/user');
const Flight = require('../db/models/flight');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");
const nodemailer = require("nodemailer");

//assuming the request carries and object with both the unique user ID
//and the seat array


let patchUser = (username, newUserData) => {
    return User.findOneAndUpdate({
        username: username
    }, newUserData);
};

let patchFlight = (id, updatedTakenSeats) => {
    return Flight.findOneAndUpdate(id, updatedTakenSeats);
};
// exports.selectSeats = (req, res) => {
//     let data = req.body
//     User.findOne({username: data.username})
//         .then((result) => {
//             console.log(result)
//             let flightsArray = result.flights
//             let flightIndex = flightsArray.findIndex(
//                 (flight) => (flight.flightId).toString() === data.flightId)
//             let currentFlight = flightsArray[flightIndex];
//             currentFlight.seat = data.seats
//             flightsArray[flightIndex] = currentFlight
//             let finalFlightsObject = { flights: flightsArray }
//             console.log(finalFlightsObject)
//             patchUser(data.username, finalFlightsObject)
//                 .then((result) => {
//                     Flights.findById({_id: data.flightId})
//                         .then((result) => {
//                             let currentlyTakenSeats = result.takenSeats
//                             currentlyTakenSeats.concat(data.seats)
//                             let updatedTakenSeats = { takenSeats: currentlyTakenSeats }
//                             patchFlight(data.flightId, updatedTakenSeats)
//                                 .then((result) => {
//                                     res.status(204).send({});
//                                 })
//                                 .catch((err)=>{
//                                     console.log('Unexpected Internal Error')
//                                 })
//                         })
//                 })
//                 .catch((err) => {
//                     res.status(400).send({});
//                     console.log('1')
//                 })
//         }
//         )
//         .catch((err)=>{
//             res.status(400).send({});
//             console.log('2')
//         })
// }

exports.selectSeats = (req, res) => {
    console.log('HERE');
    let data = req.body;
    User.findOne({ username: data.username })
        .then((result) => {
            let flightsArray = result.flights
            let flightIndex = flightsArray.findIndex(
                (flight) => (flight.flightId).toString() === data.flightId)
            let currentFlight = flightsArray[flightIndex];
            currentFlight.seat = data.seats
            flightsArray[flightIndex] = currentFlight
            let finalFlightsObject = { flights: flightsArray }
            let errorOccured = false;
            patchUser(data.username, finalFlightsObject)
                .then(() => {
                    Flight.findById(data.flightId)
                        .then((rslt) => {
                            let currentlyTakenSeats = rslt.takenSeats
                            currentlyTakenSeats = currentlyTakenSeats.concat(data.seats)
                            let updatedTakenSeats = { takenSeats: currentlyTakenSeats }
                            patchFlight({_id : data.flightId}, updatedTakenSeats)
                            .then(()=>{
                                res.status(204).send({});
                            }
                            )
                            .catch(()=>{
                                errorOccured = true;
                            })
                        })
                        .catch(() => {
                            errorOccured = true;
                        })
                })
                .catch(() => {
                    errorOccured = true;
                })
        })
        .catch(() => {
            res.status(400).send({});
            return;
        })

}
// exports.testRoute = (req, res) => {

//     console.log("req.body on next print")

//     console.log(req.body)

//     return res.status(200).send("test route succesfull");
// }

exports.addFlight = (req, res) => {
    const {username}=req.body.user;
    const {_id,flightNum,deptAirport,type,arrAirport,deptTime,arrTime,date,totalPrice,noOfSeats,cabin,bookingNumber} = req.body.flight;
    const FId = mongoose.Types.ObjectId(_id);
    const flight ={flightId:FId,flightNum,type,deptAirport,arrAirport,deptTime,arrTime,date,totalPrice,noOfSeats,cabin,bookingNumber,seat:[]};



    User.findOneAndUpdate({ username }, { $push: { flights: flight } }, (error, response) => {
        if (response) {
            res.status(200).send(response)
        }
        else {

            res.status(400).send(error)
        }
    })
}
exports.addBooking = (req, res) => {

    const { username, email } = req.body.user;
    const { bookingNumber, emailBody1, emailBody2 } = req.body;
    console.log(username)
    console.log(bookingNumber)
    User.findOneAndUpdate({ username }, { $push: { bookingReferences: bookingNumber } }, (error, response) => {
        console.log(response)
        if (response) {
            sendMail(email, emailBody1);
            sendMail(email, emailBody2);
            res.status(200).send(response);
        }
        else {
            res.status(400).send(error);
        }
    })

}
exports.updateSeats = (req, res) => {

    const { flightId, nOfEconomy, nOfBuisness, nOfFirst } = req.body;
    var userId = mongoose.Types.ObjectId(flightId);
    Flight.findOneAndUpdate({ _id: userId }, { nOfEconomy: nOfEconomy, nOfBuisness: nOfBuisness, nOfFirst: nOfFirst }, (error, response) => {
        if (response) {
            //  console.log(response)
            res.status(200).send(response);
        }
        else {

            res.status(400).send(error);
        }
    })
}

exports.getProfile = (req, res) => {
    // var objectId = mongoose.Types.ObjectId(req.body.username);

    User.findOne({ username: req.body.user.username }, (error, response) => {

        if (response) {
            res.status(200).send(response)
        }
        else {
            res.status(400).send(error)
        }
    })

}

exports.updateProfile = (req, res) => {

    console.log("I was here")
    console.log(req.body)

    const { _id, username, password, firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber } = req.body;
    var objectId = mongoose.Types.ObjectId(_id);

    User.findByIdAndUpdate({username}, { username, password, firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber }, (error, response) => {
        console.log(response)
        console.log(error)

        if (response) {
            
            res.status(200).send(response)
        }
        else {
            res.status(400).send(error)
        }
    })
}


function sendMail(email, emailBody) {
    //send email
    // console.log("send email backend");
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
            // res.
            console.log("success");
        }
    });

}

exports.sendEmail = (req, res) => {
    const {email, emailBody} = req.body;
    sendMail(email, emailBody);
    res.status(200).send("successful");
}

exports.addFlight = (req, res) =>{ 
    const {username}=req.body.user;
    const {_id,flightNum,deptAirport,type,arrAirport,deptTime,arrTime,date,totalPrice,noOfSeats,cabin,bookingNumber} = req.body.flight;
    const FId = mongoose.Types.ObjectId(_id);
    const flight ={flightId:FId,flightNum,type,deptAirport,arrAirport,deptTime,arrTime,date,totalPrice,noOfSeats,cabin,bookingNumber,seat:[]};

    User.findOneAndUpdate({ username }, { $push: { flights: flight } }, (error, response) => {
        if (response) {
            res.status(200).send(response)
        }
        else {

            res.status(400).send(error)
        }
    })
}

exports.cancelReservation = (req, res) => {

    const { username, booking, deptFlight, retFlight, email, emailBody } = req.body;
    console.log(username, booking, deptFlight, retFlight, email);
    const deptSeats = deptFlight.noOfSeats.number;
    const retSeats = retFlight.noOfSeats.number;
    console.log(deptSeats);
    console.log(retSeats);
    //update user info
    // var userId = mongoose.Types.ObjectId(uId);
    User.findOneAndUpdate(
        { username: username },
        { $pull: { flights: { bookingNumber: { $in: [booking] } }, bookingReferences: booking } }
    )
        .catch(err => {
            console.log("error")
            console.log(err);
        });



    //update flight info
    if (deptFlight.cabin == "Economy")
        Flight.findOneAndUpdate(
            { flightNum: deptFlight.flightNum },
            { $inc: { nOfEconomy: deptSeats } },
            { $push: { takenSeats: {$each: deptFlight.seat} } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else if (deptFlight.cabin == "Business")
        Flight.findOneAndUpdate(
            { flightNum: deptFlight.flightNum },
            { $inc: { nOfBusiness: deptSeats } },//retest
            { $push: { takenSeats: {$each: deptFlight.seat} } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else
        Flight.findOneAndUpdate(
            { flightNum: deptFlight.flightNum },
            { $inc: { nOfFirst: deptSeats } },
            { $push: { takenSeats: {$each: deptFlight.seat} } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });


    if (retFlight.cabin == "Economy")
        Flight.findOneAndUpdate(
            { flightNum: retFlight.flightNum },
            { $inc: { nOfEconomy: retSeats } },
            { $push: { takenSeats: {$each: retFlight.seat} } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else if (retFlight.cabin == "Business")
        Flight.findOneAndUpdate(
            { flightNum: retFlight.flightNum },
            { $inc: { nOfBusiness: retSeats } },
            { $push: { takenSeats: {$each: retFlight.seat} } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else
        Flight.findOneAndUpdate(
            { flightNum: retFlight.flightNum },
            { $inc: { nOfFirst: retSeats } },
            { $push: { takenSeats: {$each: retFlight.seat} } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });

    sendMail(email, emailBody);

    res.status(200).send("successful");
    
}

exports.makePayment = async(req,res) =>{
        
        let { amount, id } = req.body;
        
        try {
            const total = amount.amount;
          const payment = await stripe.paymentIntents.create({
            amount : total*100,
            currency: "EUR",
            description: "ACL Airline",
            payment_method: id,
            confirm: true,
          });
          console.log("Payment", payment);
          res.json({
            message: "Payment successful",
            success: true,
          });
        } catch (error) {
          console.log("Error", error);
          res.json({
            message: "Payment failed",
            success: false,
          });
        }
}

exports.bookTrip = async (req,res) =>{

    console.log(req.body);
    res.send(200).send("Booking successfully made!");


    // const {username , email }=req.body.user;
    // const { bookingNumber, emailBody } = req.body.email;
    // const _id1 = req.body.departureFlight._id;
    // const FId1 = mongoose.Types.ObjectId(_id1);
    // const _id2 = req.body.returnFlight._id;
    // const FId2 = mongoose.Types.ObjectId(_id2);
    // const {departureFlight , returnFlight} = req.body;
    // const remainingSeats1 = req.body.departureFlight.remainingSeats;
    // const remainingSeats2 = req.body.returnFLight.remainingSeats;

    // try{

    //     const user = await User.findOneAndUpdate({ username }, { $push: { flights: departureFlight , returnFlight } });

    //     const flight1 = await Flight.findOneAndUpdate({ _id: FId1 }, { remainingSeats : remainingSeats1});

    //     const flight2 = await Flight.findOneAndUpdate({ _id: FId2 }, { remainingSeats : remainingSeats2});

    //     const booking = await User.findOneAndUpdate({username}, { $push: { bookingReferences: bookingNumber }});
        
    //     sendMail(email, emailBody);

    //     res.send(200).send("Booking successfully made!");
    // }
    // catch(e){
    //     res.status(400).send(e)
    // }

}

exports.editBooking = async(req,res) => {
    const oldFlight = req.body.oldFlightUser;
    const newFlight = req.body.newFlightUser;
    const username =req.body.username;
    const Fid1 = req.body.oId;
    const Fid2 = req.body.nId;
    const FId1 = mongoose.Types.ObjectId(Fid1);
    const FId2 = mongoose.Types.ObjectId(Fid2);
    oldFlight.flightId = FId1;
    newFlight.flightId = FId2;
    const rem1 = req.body.remaining1;
    const rem2 = req.body.remaining2;

    try{
        const user1 = await User.findOneAndUpdate({ username},{ $pull: { flights: { flightId: FId1 }}});
        const user2 = await User.findOneAndUpdate({username} ,{$push: {flights : newFlight}});
        const flight1 = await Flight.findOneAndUpdate({_id : FId1} , {remainingSeats : rem1});
        const flight2 = await Flight.findOneAndUpdate({_id : FId2} , {remainingSeats : rem2});
        
        res.status(200).send("Booking Successful!");
    }
    catch(e){
        res.status(400).send("An error occurred!");
    }


}

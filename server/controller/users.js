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
    let data = req.body;
    User.findOne({ username: data.user.username })
        .then((result) => {
            let flightsArray = result.flights
            let flightIndex = flightsArray.findIndex(
                (flight) => (flight._id).toString() === data.flightId)
            let currentFlight = flightsArray[flightIndex];
            // console.log(currentFlight)
            let oldSeats = (currentFlight.takenSeats)? currentFlight.takenSeats : [] ;
            currentFlight.takenSeats = data.seats
            flightsArray[flightIndex] = currentFlight
            let finalFlightsObject = { flights: flightsArray }
            let errorOccured = false;
            patchUser(data.user.username, finalFlightsObject)
                .then(() => {
                    Flight.findById(data.flightId)
                        .then((rslt) => {
                            let currentlyTakenSeatsUnfiltered = rslt.takenSeats
                            let currentlyTakenSeats = currentlyTakenSeatsUnfiltered.filter((seat)=>{
                                return !(oldSeats.includes(seat))
                            })
                            currentlyTakenSeats = currentlyTakenSeats.concat(data.seats)
                            let updatedTakenSeats = { takenSeats: currentlyTakenSeats }
                            patchFlight({_id : data.flightId}, updatedTakenSeats)
                            .then(()=>{
                                res.status(204).send({});
                            }
                            )
                            .catch(()=>{
                                console.log("error 1")
                                errorOccured = true;
                            })
                        })
                        .catch(() => {
                            console.log("error 2")
                            errorOccured = true;
                        })
                })
                .catch(() => {
                    console.log("error 3")
                    errorOccured = true;
                })
        })
        .catch(() => {
            console.log("error 4")
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

    const { _id, username, password, firstName, lastName, homeAddress, countryCode, phoneNumber, phoneNumber2, email, passportNumber } = req.body;

    User.findOneAndUpdate({username}, { username, password, firstName, lastName, homeAddress, countryCode, phoneNumber, phoneNumber2, email, passportNumber }, (error, response) => {
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
            { $inc: { 'remainingSeats.0': deptSeats } },
            { $pullAll: { takenSeats:  deptFlight.takenSeats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else if (deptFlight.cabin == "Business")
        Flight.findOneAndUpdate(
            { flightNum: deptFlight.flightNum },
            { $inc: { 'remainingSeats.1': deptSeats } },//retest
            { $pullAll: { takenSeats:  deptFlight.takenSeats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else
        Flight.findOneAndUpdate(
            { flightNum: deptFlight.flightNum },
            { $inc: { 'remainingSeats.2': deptSeats } },
            { $pullAll: { takenSeats:  deptFlight.takenSeats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    if (retFlight.cabin == "Economy")
        Flight.findOneAndUpdate(
            { flightNum: retFlight.flightNum },
            { $inc: { 'remainingSeats.0': retSeats } },
            { $pullAll: { takenSeats:  retFlight.takenSeats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else if (retFlight.cabin == "Business")
        Flight.findOneAndUpdate(
            { flightNum: retFlight.flightNum },
            { $inc: { 'remainingSeats.1': retSeats } },
            { $pullAll: { takenSeats:  retFlight.takenSeats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else
        Flight.findOneAndUpdate(
            { flightNum: retFlight.flightNum },
            { $inc: { 'remainingSeats.2' : retSeats } },
            { $pullAll: { takenSeats:  retFlight.takenSeats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });

    sendMail(email, emailBody);

    res.status(200).send("successful");
    
}

exports.getFlight = (req, res) =>{
    let {flightId} = req.query; //to extract params
    Flight.findById(flightId)
    .then((rslt) => {
        const nOfEconomy = rslt.nOfEconomy;
        const nOfBusiness = rslt.nOfBusiness;
        const nOfFirst = rslt.nOfFirst;
        const takenSeats = rslt.takenSeats;
        const flightNum = rslt.flightNum;
        const seats = {
            _id : flightId,
            nOfEconomy : nOfEconomy,
            nOfBusiness : nOfBusiness,
            nOfFirst : nOfFirst,
            takenSeats : takenSeats,
            flightNum : flightNum
        };
        res.status(200).send(seats);
    })
    .catch((err) =>{
        res.status(400).send({});
        return;
    })
}
exports.makePayment = async(req,res,next) =>{
       console.log(req.body.amount);
       console.log(req.body.id);
        
        let { amount, id } = req.body;
        
        
        try {
          const total = amount;
          const payment = await stripe.paymentIntents.create({
            amount : total*100,
            currency: "EUR",
            description: "ACL Airline",
            payment_method: id,
            confirm: true,
          });
          console.log("Payment", payment);
          next();
        } catch (error) {
          console.log("Error", error);
          res.status(400).send({ paymentError:true });
        }
}

exports.getReservations = (req,res)=>{
    let {userId} = req.query;
    User.findById(userId)
    .then((rslt)=>{
        let bookings = rslt.bookingReferences;
        let reservations = rslt.flights;
        let referencesAndReservations = {
            bookings : bookings,
            reservations : reservations
        }
        res.status(200).send(referencesAndReservations);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
}



exports.bookTrip = async (req,res) =>{

     let {departureFlight , returnFlight} = req.body;
     const {username , email }=req.body.user;
     const { bookingNumber , emailBody1 , emailBody2 } = req.body ;
     const {remainingSeats: remainingSeats1} = departureFlight;
     const {remainingSeats: remainingSeats2} = returnFlight;
     const _id1 = req.body.departureFlight._id;
     const FId1 = mongoose.Types.ObjectId(_id1);
     const _id2 = req.body.returnFlight._id;
     const FId2 = mongoose.Types.ObjectId(_id2);
    
     delete departureFlight.nOfEconomy;
     delete departureFlight.nOfBusiness;
     delete departureFlight.nOfFirst;
     delete departureFlight.remainingSeats;

     delete returnFlight.nOfEconomy;
     delete returnFlight.nOfBusiness;
     delete returnFlight.nOfFirst;
     delete returnFlight.remainingSeats;
     
    
    try{

        const addUserf1 = await User.findOneAndUpdate({ username }, { $push: { flights: departureFlight} });
        const addUserf2 = await User.findOneAndUpdate({ username }, { $push: { flights:  returnFlight } });
        const flight1 = await Flight.findOneAndUpdate({ _id: FId1 }, { remainingSeats : remainingSeats1});
        const flight2 = await Flight.findOneAndUpdate({ _id: FId2 }, { remainingSeats : remainingSeats2});
        const booking = await User.findOneAndUpdate({username}, { $push: { bookingReferences: bookingNumber }});
        sendMail(email, emailBody1);
        sendMail(email, emailBody2);

        res.status(200).send("successful");
    }
    catch(e){
        res.status(400).send({paymentError: false});
    }

}

exports.editBooking = async(req,res) => {
    const {username , email }=req.body.user;
    const emailBody = req.body.email;
    const oldFlight = req.body.oldUserFlight;
    const newFlight = req.body.newUserFlight;
    const Fid1 = oldFlight._id;
    const Fid2 = newFlight._id;
    const FId1 = mongoose.Types.ObjectId(Fid1);
    const FId2 = mongoose.Types.ObjectId(Fid2);
    const newF = req.body.newFlight;
    const oldF = req.body.oldFlight;
    newF._id = FId2;
    oldF._id = FId1;
    //console.log(emailBody);
    //console.log(email);

    try{
        const user1 = await User.findOneAndUpdate({username},{ $pull: { flights: { _id: Fid1 }}});
        const user2 = await User.findOneAndUpdate({username} ,{$push: {flights : newFlight}});
        const flight1 = await Flight.findOneAndReplace({_id : FId1} , oldF);
        const flight2 = await Flight.findOneAndReplace({_id : FId2} , newF);
        sendMail(email , emailBody);
        res.status(200).send("Booking Successful!");
    }
    catch(e){
        res.status(400).send("An error occurred!");
    }
}
exports.getReservations = (req,res)=>{
    const {username} = req.body.user;
    User.findOne({ username: username })
    .then((rslt)=>{
        let bookings = rslt.bookingReferences;
        let reservations = rslt.flights;
        let referencesAndReservations = {
            bookings : bookings,
            reservations : reservations
        }
        res.status(200).send(referencesAndReservations);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
}

exports.getBooking =  (req,res) => {
    //console.log(req.query)
    let bookingNum = (req.query).bookingNum;
    const {username} = req.body.user;
    User.findOne({ username: username })
    .then((rslt)=>{
        const flightsArray = rslt.flights;
    const deptFlight =  (flightsArray.filter(flight => {
        return ((flight.bookingNumber === bookingNum)&& flight.type === 'departure')
      }))[0]
    
      const retFlight =  (flightsArray.filter(flight => {
        return ((flight.bookingNumber === bookingNum)&& flight.type === 'return')
      }))[0]

    let deptAndRet = {
        deptFlight : deptFlight,
        retFlight : retFlight
    }
    //console.log(deptAndRet)
      res.status(200).send(deptAndRet); 
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
   
}

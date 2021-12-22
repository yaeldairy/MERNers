const User = require('../db/models/user');
const Flight = require('../db/models/flight');
const mongoose = require('mongoose');



//assuming the request carries and object with both the unique user ID
//and the seat array
let patchUser = (id, newUserData) => {
    return User.findOneAndUpdate({
        _id: id
    }, newUserData);
};

let patchFlight = (id, updatedTakenSeats) => {
    return Flight.findOneAndUpdate({
        _id: id
    }, updatedTakenSeats);
};
exports.selectSeats = (req, res) => {
    let data = req.body
    User.findById(data.userId)
        .then((result) => {
            let flightsArray = result.flights
            let flightIndex = flightsArray.findIndex(
                (flight) => (flight.flightId).toString() === data.flightId)
            let currentFlight = flightsArray[flightIndex];
            currentFlight.seat = data.seats
            flightsArray[flightIndex] = currentFlight
            let finalFlightsObject = { flights: flightsArray }
            patchUser(data.userId, finalFlightsObject)
                .then((result) => {
                    Flights.findById(data.flightId)
                        .then((result) => {
                            let currentlyTakenSeats = result.takenSeats
                            currentlyTakenSeats.concat(data.seats)
                            let updatedTakenSeats = { takenSeats: currentlyTakenSeats }
                            patchFlight(data.flightId, updatedTakenSeats)
                                .then((result) => {
                                    res.status(204).send({});
                                })
                                .catch((err) => {
                                    console.log('Unexpected Internal Error')
                                })
                        })
                })
                .catch((err) => {
                    res.status(400).send({});
                })
        }
        )
}


exports.testRoute = (req, res) => {

    console.log("req.body on next print")

    console.log(req.body)

    return res.status(200).send("test route succesfull");


};
exports.addFlight = async (req, res) => { //TODO check what info they need here (duration, arrDate)

    const { username } = req.body.user;
    const { _id, flightNum, deptAirport, arrAirport, deptTime, arrTime, date, totalPrice, noOfSeats, cabin, bookingNumber } = req.body.flight;
    const FId = mongoose.Types.ObjectId(_id);
    const flight = { flightId: FId, flightNum, deptAirport, arrAirport, deptTime, arrTime, date, totalPrice, noOfSeats, cabin, bookingNumber, seat: [] };



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

    const { username } = req.body.user;
    const { bookingNumber } = req.body;
    console.log(username)
    console.log(bookingNumber)
    User.findOneAndUpdate({ username }, { $push: { bookingReferences: bookingNumber } }, (error, response) => {
        console.log(response)
        if (response) {
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

    const { _id, username, password, firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber } = req.body;
    var objectId = mongoose.Types.ObjectId(_id);

    User.findByIdAndUpdate(objectId, { username, password, firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber }, (error, response) => {
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

exports.sendEmail = (req, res) => {
    const {email, body} = req.body;
    this.sendMail();
}


exports.cancelReservation = (req, res) => {

    const { uId, booking, deptFlight, retFlight, email, emailBody } = req.body;

    //update user info
    var userId = mongoose.Types.ObjectId(uId);
    User.findOneAndUpdate(
        { _id: userId },
        { $pull: { flights: { bookingNum: { $in: [booking] } }, bookingReferences: booking } }
    )
        .catch(err => {
            console.log("error")
            console.log(err);
        });



    //update flight info
    if (deptFlight.cabin == "economy")
        Flight.findOneAndUpdate(
            { flightNum: deptFlight.flightNum },
            { $inc: { noOfEconomy: deptFlight.seats.length } },
            { $push: { takenSeats: deptFlight.seats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else if (deptFlight.cabin == "business")
        Flight.findOneAndUpdate(
            { flightNum: deptFlight.flightNum },
            { $inc: { noOfBusiness: deptFlight.seats.length } },
            { $push: { takenSeats: deptFlight.seats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else
        Flight.findOneAndUpdate(
            { flightNum: deptFlight.flightNum },
            { $inc: { noOfFirst: deptFlight.seats.length } },
            { $push: { takenSeats: deptFlight.seats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });


    if (retFlight.cabin == "economy")
        Flight.findOneAndUpdate(
            { flightNum: retFlight.flightNum },
            { $inc: { noOfEconomy: retFlight.seats.length } },
            { $push: { takenSeats: retFlight.seats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else if (retFlight.cabin == "business")
        Flight.findOneAndUpdate(
            { flightNum: retFlight.flightNum },
            { $inc: { noOfBusiness: retFlight.seats.length } },
            { $push: { takenSeats: retFlight.seats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    else
        Flight.findOneAndUpdate(
            { flightNum: retFlight.flightNum },
            { $inc: { noOfFirst: retFlight.seats.length } },
            { $push: { takenSeats: retFlight.seats } }
        )
            .catch(err => {
                console.log("error")
                console.log(err);
            });

    this.sendMail(email, emailBody);
}
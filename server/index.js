const express = require('express') //import express. To set up a simple express server
const app = express()
const mongoose = require('mongoose');
const Flight = require ('./models/flight.js');
//Connecting to database
mongoose.connect('mongodb+srv://Merners:Mern123@aclairlinereservation.gje3t.mongodb.net/Airline-Reservation?retryWrites=true&w=majority',{
    useNewURLParser : true
})

app.get('/insertTest', async (req,res) => {
    const flight = new Flight ({
        flightNum : 'A123',
        deptAirport : 'JED',
        arrAirport : 'CAI',
        deptTime : '12:00',
        arrTime : '13:45',
        date : '14/11/2021',
        nOfEconomy : 150,
        nOfBusiness : 20
    }); //this just creates it, doesnt insert it
    await flight.save(); //to actually insert into DB. 
    res.send('Data inserted');
})

app.get('/read', async (req,res) => {
    Flight.find({}, (err,result) => {
        if (err){
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
})


app.listen(3001, ()=>{
    console.log('Connection to Server Successful!');
})

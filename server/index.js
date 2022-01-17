require('dotenv').config()
const express = require('express') //import express. To set up a simple express server
const app = express()
const cors = require ('cors')
const mongoose = require('mongoose');
const Flight = require ('./db/models/flight.js');
const bodyParser = require('body-parser')
//Connecting to database
mongoose.connect('mongodb+srv://Merners:Mern123@aclairlinereservation.gje3t.mongodb.net/Airline-Reservation?retryWrites=true&w=majority',{
    useNewURLParser : true
})

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
const flights = new Map([])

app.use(cors({origin: ['http://localhost:3000']}));  // allows us to recieve json files
app.use(cors());  //connects our front and back ends
app.use(express.json()); //to recieve json files
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


const adminRouter = require('./router/admin')
const userRouter = require('./router/user')
const generalRouter = require('./router/general')

// app.post('/auth', [
//     VerifyUserMiddleware.hasAuthValidFields,
//     VerifyUserMiddleware.isPasswordAndUserMatch,
//     AuthorizationController.login
// ]);

app.use('/', generalRouter)
app.use('/admin', adminRouter)
app.use('/user', userRouter)



// app.get('/insertTest', async (req,res) => {
//     const flight = new Flight ({
//         flightNum : 'A123',
//         deptAirport : 'JED',
//         arrAirport : 'CAI',
//         deptTime : '12:00',
//         arrTime : '13:45',
//         date : '14/11/2021',
//         nOfEconomy : 150,
//         nOfBusiness : 20
//     }); //this just creates it, doesnt insert it
//     await flight.save(); //to actually insert into DB. 
//     res.send('Data inserted');
// })



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

// app.post('/login',(req,res) => {
//     const username =req.body.username;
// }
// )


app.listen(3001, ()=>{
    console.log('Connection to Server Successful!');
})

const express = require('express')
const controller= require ('../controller/users')
const verifyToken = require ('../Auth/auth.validation.middleware')
const permissionMiddleware = require ('../Auth/auth.permission.middleware')

const router = express.Router()
router.use(express.json())

router.use(verifyToken.validJWTNeeded)
router.use(permissionMiddleware.userPermission)
router.patch('/addBooking',controller.addBooking)
router.patch('/selectSeats',controller.selectSeats)
router.patch('/addFlight', controller.addFlight )
router.patch('/updateSeats', controller.updateSeats )
router.patch('/bookTrip' , [controller.makePayment , controller.bookTrip])
router.patch('/editBooking' , [controller.makePayment , controller.editBooking])
router.patch('/editBookingNoPay' , controller.editBooking);
//router.post('/payment',controller.makePayment)
//router.post('/payment',controller.makePayment);
router.get('/reservations', controller.getReservations);
router.get('/booking', controller.getBooking);

router.get('/getProfile', controller.getProfile);
router.patch('/updateProfile', controller.updateProfile);
router.post('/cancelReservation', controller.cancelReservation);
router.post('/sendEmail', controller.sendEmail );
//router.patch('/editBooking' , controller.editBooking);
router.get('/getFlight', controller.getFlight);
router.get('/reservations', controller.getReservations);
router.get('/booking', controller.getBooking);
// router.patch('/addFlight',controller.addFlight);


module.exports = router
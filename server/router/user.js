const express = require('express')
const controller= require ('../controller/users')
const verifyToken = require ('../Auth/auth.validation.middleware')
const permissionMiddleware = require ('../Auth/auth.permission.middleware')

const router = express.Router()
router.use(express.json())

// router.use(verifyToken.validJWTNeeded)
// router.use(permissionMiddleware.userPermission)

router.get('/test', controller.testRoute);

router.patch('/addFlight',controller.addFlight)

//router.patch('/addSeats',controller.addSeats)

// router.patch('/addBooking',controller.addBooking)

router.patch('/updateSeats',controller.updateSeats)


module.exports = router
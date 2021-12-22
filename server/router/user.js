const express = require('express')
const controller= require ('../controller/users')
const verifyToken = require ('../Auth/auth.validation.middleware')
const permissionMiddleware = require ('../Auth/auth.permission.middleware')

const router = express.Router()
router.use(express.json())

<<<<<<< HEAD

router.use(verifyToken.validJWTNeeded)
router.use(permissionMiddleware.userPermission)
=======
// router.use(verifyToken.validJWTNeeded)
// router.use(permissionMiddleware.userPermission)
>>>>>>> token/security

router.get('/test', controller.testRoute);
router.patch('/selectSeats',controller.selectSeats)
router.patch('/addFlight', controller.addFlight )

router.patch('/addFlight',controller.addFlight)

router.patch('/addSeats',controller.selectSeats)

router.patch('/addBooking',controller.addBooking)

router.patch('/updateSeats',controller.updateSeats)

router.get('/getProfile', controller.getProfile);

router.patch('/updateProfile', controller.updateProfile);

router.post('/cancelFlight', controller.cancelFlight);

module.exports = router
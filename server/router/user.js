const express = require('express')
const controller= require ('../controller/users')
const verifyToken = require ('../Auth/auth.validation.middleware')
const permissionMiddleware = require ('../Auth/auth.permission.middleware')

const router = express.Router()
router.use(express.json())
const controller= require ('../controller/users');


router.use(verifyToken.validJWTNeeded)
router.use(permissionMiddleware.userPermission)

router.get('/test', controller.testRoute);
router.patch('/selectSeats',controller.selectSeats)
router.patch('/addFlight', controller.addFlight )
router.get('/getProfile', controller.getProfile);
router.patch('/updateProfile', controller.updateProfile);
router.post('/cancelFlight', controller.cancelFlight);
router.post('/sendEmail',controller.sendEmail);
// router.patch('/addFlight',controller.addFlight);


module.exports = router
const express = require('express')
const router = express.Router()
router.use(express.json())

const controller= require ('../controller/general')
const verifyUser = require ('../Auth/verify.user.middleware')

router.post('/login', [verifyUser.isPasswordAndUserMatch,controller.login]);

router.post('/adminLogin', [verifyUser.isPasswordAndAdminMatch,controller.login]);

router.post('/signup', controller.insertUser);

router.post('/changePassword', [controller.isCorrectPassword, controller.changePassword]);

router.get('/flights', controller.allFlights)

router.get('/passwordEnc', controller.encPassword)

module.exports = router


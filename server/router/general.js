const express = require('express')
const router = express.Router()
router.use(express.json())

const controller= require ('../controller/general')
const verifyUser = require ('../Auth/verify.user.middleware')

router.post('/login', [verifyUser.isPasswordAndUserMatch,controller.login]);

router.post('/signup', controller.insertUser);

router.get('/flights', controller.allFlights)
module.exports = router


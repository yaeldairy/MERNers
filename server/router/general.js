const express = require('express')
const router = express.Router()
router.use(express.json())

const controller= require ('../controller/general')
<<<<<<< HEAD
const verifyUser = require ('../Auth/verify.user.middleware')

router.post('/login', [verifyUser.isPasswordAndUserMatch,controller.login]);
=======

router.post('/signup', controller.insertUser);



module.exports = router
>>>>>>> feature/userProfile

router.post('/signup', controller.insertUser);

router.get('/flights', controller.allFlights)


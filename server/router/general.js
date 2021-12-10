const express = require('express')
const router = express.Router()
router.use(express.json())

const controller= require ('../controller/general')
const verifyUser = require ('../Auth/verify.user.middleware')

router.get('/login', [verifyUser.isPasswordAndUserMatch,controller.login]);

module.exports = router
const express = require('express')
const router = express.Router()
router.use(express.json())
const controller= require ('../controller/users')

//Start of code added by Yasser
router.patch('/selectSeats',controller.selectSeats)


//End of code added by Yasser

module.exports = router
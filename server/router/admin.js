const express = require('express')
const router = express.Router()
router.use(express.json())

const controller= require ('../controller/admin')


router.get('/flights', controller.allFlights)

router.get('/updateFlight',controller.updateFlight)



module.exports = router
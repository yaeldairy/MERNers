const express = require('express')
const router = express.Router()
router.use(express.json())

const controller= require ('../controller/admin')


router.get('/flights', controller.allFlights)


router.patch('/updateFlight', controller.updateFlight)


router.post('/deleteFlight', controller.deleteFlight)




module.exports = router
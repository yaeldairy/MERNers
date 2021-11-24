const express = require('express')
const router = express.Router()
router.use(express.json())

const controller= require ('../controller/admin')


router.get('/flights', controller.allFlights)
router.post('/flights', [controller.insertFlight]);



module.exports = router
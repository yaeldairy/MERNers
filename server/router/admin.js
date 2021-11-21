const express = require('express')
const router = express.Router()
router.use(express.json())


router.get('/flights', controller.allFlights)




module.exports = router
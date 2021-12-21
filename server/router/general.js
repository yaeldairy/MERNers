const express = require('express')
const router = express.Router()
router.use(express.json())


const controller= require ('../controller/general')

router.post('/signup', controller.insertUser);

module.exports = router
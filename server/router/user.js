const express = require('express')
const router = express.Router()
router.use(express.json())
const controller= require ('../controller/users');

router.get('/getProfile', controller.getProfile);
router.patch('/updateProfile', controller.updateProfile);
router.post('/cancelFlight', controller.cancelFlight);
router.post('/sendEmail',controller.sendEmail);
router.patch('/addFlight',controller.addFlight);


module.exports = router
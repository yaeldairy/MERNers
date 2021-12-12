const express = require('express')
const router = express.Router()
router.use(express.json())

router.get('/getProfile',controller.updateProfile);
router.patch('/updateProfile',controller.updateProfile);


module.exports = router
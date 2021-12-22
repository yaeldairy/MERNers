const express = require('express')
const controller= require ('../controller/admin')
const verifyToken = require ('../Auth/auth.validation.middleware')
const permissionMiddleware = require ('../Auth/auth.permission.middleware')

const router = express.Router()
router.use(express.json())
// router.use(verifyToken.validJWTNeeded)
// router.use(permissionMiddleware.AdminPermission)

router.get('/test', controller.testRoute);

router.patch('/updateFlight', controller.updateFlight)
router.post('/deleteFlight', controller.deleteFlight)
router.post('/flights', [controller.insertFlight]);

router.get('/updateFlight',controller.updateFlight)



module.exports = router
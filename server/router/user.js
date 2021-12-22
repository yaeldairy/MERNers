const express = require('express')
const controller= require ('../controller/users')
const verifyToken = require ('../Auth/auth.validation.middleware')
const permissionMiddleware = require ('../Auth/auth.permission.middleware')

const router = express.Router()
router.use(express.json())

router.use(verifyToken.validJWTNeeded)
router.use(permissionMiddleware.userPermission)

router.patch('/test', controller.testRoute);

router.patch('/addFlight', controller.addFlight )




module.exports = router
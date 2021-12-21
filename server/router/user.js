const express = require('express')
const controller= require ('../controller/users')
const verifyToken = require ('../Auth/auth.validation.middleware')
const permissionMiddleware = require ('../Auth/auth.permission.middleware')

const router = express.Router()
router.use(express.json())
const controller= require ('../controller/users')



router.use(verifyToken.validJWTNeeded)
router.use(permissionMiddleware.userPermission)

router.get('/test', controller.testRoute);
router.patch('/selectSeats',controller.selectSeats)



module.exports = router
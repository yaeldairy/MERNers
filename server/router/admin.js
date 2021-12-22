const express = require('express')
const controller= require ('../controller/admin')
const verifyToken = require ('../Auth/auth.validation.middleware')
const permissionMiddleware = require ('../Auth/auth.permission.middleware')
const authorize = require('../auth/middleware');
const config = require ('../auth/config')
const jwt = require('jsonwebtoken');

const router = express.Router()
router.use(express.json())
// router.use(verifyToken.validJWTNeeded)
// router.use(permissionMiddleware.AdminPermission)

router.get('/test', controller.testRoute);





 //npm install jsonwebtoken

// router.get('/token', authorize(), (req, res)=>{ //do i need authorize?
//     const payload = {
//         name: "Yasmina",
//         scopes: []
//     };
//     const token = jwt.sign(payload, config.adminSecret);
//     res.send(token);
// })

//router.get('/flights', authorize("flight:get"), controller.allFlights);
router.patch('/updateFlight', controller.updateFlight)
router.post('/deleteFlight', controller.deleteFlight)
router.post('/flights', [controller.insertFlight]);

router.get('/updateFlight',controller.updateFlight)



module.exports = router
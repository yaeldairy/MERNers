var jwt = require('jsonwebtoken');


exports.login = (req, res) => {
    
    var token = jwt.sign(req.body, process.env.SECRET);
    console.log(token)
    res.status(201).send({accessToken: token});

 };
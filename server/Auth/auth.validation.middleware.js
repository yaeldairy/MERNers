const jwt = require('jsonwebtoken');

exports.validJWTNeeded = (req, res, next) => {

    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        
        return res.status(403).send({errors: ['Token needed to access this route']});
    }

    jwt.verify( token , "SECRET" , (err, user) => {

        if (user){
            
            req.body.user = user
            return next();
        }
        return res.status(400).send({errors: ['Invalid Token']});      
    })

}; 
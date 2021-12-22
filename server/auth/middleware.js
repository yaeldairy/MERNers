const jwt = require('jsonwebtoken'); //npm install jsonwebtoken
const config = require ('../auth/config');


module.exports = (credentials = []) => {
    return (req, res, next) => {
        if (typeof credentials === "string")
            credentials = [credentials];
        const token = req.headers('authorization');
        if (!token)
            return res.status(401).send("access denied");
        else{
            const tokenBody = token.slice(7); //set as Bearer
            jwt.verify(tokenBody, config.adminSecret, (err, decoded) =>{
                if(!err)
                    return res.status(401).send("sign in again");
                if (credentials.length>0){
                    if (decoded.scopes && decoded.scopes.length && credentials.some(cred => decoded.scopes.indexOf(cred)>=0)){ //actually checks credentials
                        next();//allows req to continue
                    }else{
                        return res.status(401).send("access denied");
                    }
                }else{
                    //no credentials required
                    next();
                }
            
            });
        }
    }
};
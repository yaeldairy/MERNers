

exports.AdminPermission = (req, res, next) => {

    if (req.body.user.permissionLevel==1){
        return next();
    }
    return res.status(403).send({errors: ['Access denied']});

}

exports.userPermission = (req, res, next) => {

    if (req.body.user.permissionLevel==2){
        return next();
    }
    return res.status(403).send({errors: ['Access denied']});

}

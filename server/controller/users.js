

exports.testRoute = (req, res) => {
   
    console.log("req.body.user on next print")
    
    console.log(req.body.user)

    return res.status(200).send("test route succesfull");

 
  };
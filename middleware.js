const jwt = require("jsonwebtoken");

const originAuthorization = (req,res,next) =>{
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS,DELETE,GET,POST")
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Authorisation,Content-Type" )

    if(req.method === 'OPTIONS')
        return res.sendStatus(200)

    return next();
}


const authAuthorization = (req,res,next) => {
    const header = req.get("Authorization");
    // check if header exists
    if(!header){
        req.isAuth =false;
        return next();
    }

    // extract token form header
    const token = header.split(" ")[1];
    if(!token){
        req.isAuth = false;
        return next();
    }

    // take token and check it veracity
    let decodeToken;
    try{
        decodeToken =  jwt.verify(token,"kratos super token");
    }catch(err){
        req.isAuth = false;
        // if token is expire or invalid 
        // we need to send it as res.json({and pass errors messages here })
        return res.json({error: true, message: err.message });
    }
    if(!decodeToken){
        req.isAuth = false;
        return next();
    }

    // extract all information on token 
    req.isAuth = true;
    req.role = decodeToken.role;
    req.email = decodeToken.email;
    return next();
    
}

module.exports = {
    originAuthorization,
    authAuthorization
}
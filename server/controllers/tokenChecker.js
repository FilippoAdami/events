const jwt = require('jsonwebtoken'); 

const tokenChecker = (req, res , next) => {
    const token = req.headers["x-access-token"]
    if(!token){
        res.status(403).json({auth: false, message: "Token assente"})
    } else {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded ) =>{
            if(err){
                res.status(403).json({ auth: false, message: "Unauthorized access"})
            }
            else{
                req.utenteLoggato = decoded
                next()
            }
        })
    }
}

module.exports = tokenChecker
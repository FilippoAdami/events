const jwt = require('jsonwebtoken'); 

const tokenChecker = (req, res , next) => {
    const token = req.headers["x-access-token"]
    if(!token){
        let errore ={ errormessage: "Token assente"}
        res.status(403).send(errore);
        //res.json({auth: false, message: "token non trovato"})
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
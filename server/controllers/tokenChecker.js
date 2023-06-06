const jwt = require('jsonwebtoken'); 

const tokenChecker = (req, res , next) => {
    const token = req.headers["x-access-token"]
    if(!token){
        res.json({auth: false, message: "token non trovato"})
    } else {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded ) =>{
            if(err){
                res.json({ auth: false, message: "errore autenticazione"})
            }
            req.userVerificato = decoded
            next()
        })
    }
}

module.exports = tokenChecker
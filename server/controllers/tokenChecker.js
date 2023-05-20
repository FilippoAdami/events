const jwt = require('jsonwebtoken'); 

const tokenChecker = function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) {
		return res.status(401).send({ 
			success: false,
			message: 'token non trovato'
		});
	}

	jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {			
		if (err) {
			return res.status(403).send({ success: false, message: 'autenticazione token fallita' });		
		} else {
			req.utenteLoggato = decoded;
			next();
		}
	});
};

module.exports = tokenChecker
const config  = require('./config');
const jwt			= require('jsonwebtoken');

module.exports = Auth;

async function Auth(req, res, next) {
	// check for basic auth header
	if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
		return res.status(401).json({ message: 'Missing Authorization Header' });
	}

	// verify token
	const base64Credentials =  req.headers.authorization.split(' ')[1];

	try{
		var decoded = jwt.verify(base64Credentials, config.jwt.secret);
	}catch(err){
		return res.status(401).json(err);
	}

	const serviceId  = decoded.data.service ? decoded.data.service.id : null;

	if(!serviceId){//Must a service requesting access
		return res.status(401).json({ message: 'Invalid token - token malformed' });
	}

	//Here we can append additional data to the request...
	req.queryParams = decoded.data.params;

	next();
}
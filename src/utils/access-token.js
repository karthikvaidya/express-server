const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { secret, expiration } = require('../config').JWT;

const createToken = async (params) => {
	const type = params.tokenType || 'login';
	const salt = crypto.randomBytes(16).toString('base64');
	const token = jwt.sign(
		{
			salt,
			email: params.email,
			userId: params.userId,
			sessionId: params.sessionId,
		},
		secret,
		{ expiresIn: expiration[type] }
	);

	return token;
};

module.exports = createToken;

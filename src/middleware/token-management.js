const jwt = require('jsonwebtoken');
const isEmpty = require('lodash/isEmpty');

const { JWT } = require('../config');
const { errorLog } = require('../../logs');
const session = require('../sessions').controller;
const responseHandler = require('../helpers/response-handler');
const { getUserInfoForThisSession } = require('../shared');

const { secret } = JWT;

exports.validateAccessToken = async (request, response, next) => {
	try {
		if (isEmpty(request.headers.authorization)) {
			return responseHandler.error(response, 'Access token missing', 401);
		}

		const authorization = request.headers.authorization.split(' ');
		const token = authorization[1];

		if (authorization[0] !== 'Bearer') {
			return responseHandler.error(response, 'Access token missing', 401);
		}

		jwt.verify(token, secret, async (error, decoded) => {
			if (error) {
				errorLog(error);
				return responseHandler.error(response, 'Access token expired', 405);
			}

			const result = await session.get({ sessionId: decoded.sessionId });
			if (result.rowCount <= 0) {
				return responseHandler.error(
					response,
					'No session found for this access token',
					403
				);
			}
			const sessionObj = result.rows[0];

			if (sessionObj.token !== token) {
				return responseHandler.error(response, 'Access token mismatch', 403);
			}

			if (sessionObj.status === 'disabled') {
				return responseHandler.error(response, 'Access token disabled', 403);
			}

			if (sessionObj.status === 'invalidated') {
				return responseHandler.error(response, 'Access token expired', 405);
			}

			if (
				new Date().getTime() > new Date(sessionObj.expirationTime).getTime()
			) {
				return responseHandler.error(response, 'Access token expired', 405);
			}

			const userObj = await getUserInfoForThisSession(sessionObj.userId);
			if (isEmpty(userObj)) {
				return responseHandler.error(
					response,
					'User role is invalid or deleted',
					403
				);
			}

			request.verifiedUser = { ...userObj, sessionId: decoded.sessionId };

			return next();
		});
	} catch (error) {
		errorLog(error);
		const code = error.name === 'Error' ? 400 : 500;
		return responseHandler.error(response, error.message, code);
	}
};

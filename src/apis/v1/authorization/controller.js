const crypto = require('crypto');
const isEmpty = require('lodash/isEmpty');

const manager = require('./manager');
const session = require('../../../sessions/controller');
const { generateId } = require('../../../utils');
const responseHandler = require('../../../helpers/response-handler');

const authLogin = async (request, response) => {
	const params = { ...request.verifiedParams };

	const userObj = await manager.getByEmail(params, 'admin');
	if (isEmpty(userObj)) {
		throw new Error('User not found');
	}

	/** Verify password */
	const passwordFields = userObj.password.split('$');
	const salt = passwordFields[0];
	const hash = crypto
		.createHmac('sha512', salt)
		.update(params.password)
		.digest('base64');
	if (hash !== passwordFields[1]) {
		throw new Error('Invalid email or password');
	}

	/** Create a login session */
	userObj.tokenType = 'login';
	const sessionObj = await session.create(userObj);

	const user = {
		...userObj,
		token: sessionObj.token,
	};
	delete user.password;
	delete user.tokenType;
	return responseHandler.success(response, { user }, 201);
};

const authSignup = async (request, response) => {
	const params = { ...request.verifiedParams };

	/** Create a new user */
	const salt = crypto.randomBytes(16).toString('base64');
	const hash = crypto
		.createHmac('sha512', salt)
		.update(params.password)
		.digest('base64');
	params.password = `${salt}$${hash}`;
	params.userId = await generateId();
	await manager.createUser(params);

	return responseHandler.success(response, {}, 201);
};

module.exports = {
	authLogin,
	authSignup,
};

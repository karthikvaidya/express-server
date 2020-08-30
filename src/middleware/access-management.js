const get = require('lodash/get');
const find = require('lodash/find');
const isEmpty = require('lodash/isEmpty');
const { errorLog } = require('../../logs');
const responseHandler = require('../helpers/response-handler');
const { getAccessRights } = require('../shared');

exports.validateAccessPermission = async (request, response, next) => {
	try {
		const { verifiedUser, method, route, baseUrl } = request;
		const allowedRoutes = await getAccessRights(verifiedUser.role);
		const requestedRoute = { route: `${baseUrl}${route.path}`, method };
		const forbiddenRoutes = find(
			get(allowedRoutes, 'permissions.forbiddenRoutes', {}),
			requestedRoute
		);

		if (isEmpty(forbiddenRoutes)) {
			return next();
		}

		return responseHandler.error(response, 'Access denied.', 403);
	} catch (error) {
		errorLog(error);
		const code = error.name === 'Error' ? 400 : 500;
		return responseHandler.error(response, error.message, code);
	}
};

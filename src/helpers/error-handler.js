const { errorLog } = require('../../logs');
const responseHandler = require('./response-handler');

module.exports = {
	// eslint-disable-next-line no-unused-vars
	handleDevErrors: async (error, request, response, next) => {
		/* log the error using winston for all Development and Production errors */
		errorLog(error);
		if (error.name === 'Error') {
			return responseHandler.error(response, error.message || error.stack, 400);
		}

		return responseHandler.error(response, error.message || error.stack, 500);
	},

	/* this is for handling 404 error */
	handle404Error: async (request, response) => {
		const { originalUrl } = request;
		const fullUrl = `${request.get('host')}${originalUrl}`;
		const msg = `Requested route not found : ${fullUrl}`;
		errorLog(msg);
		return responseHandler.error(response, msg, 404);
	},

	/* centralizing all the errors */
	handleExceptions: (fn) => (request, response, next) => {
		fn(request, response).catch((error) => {
			/* eslint-disable-next-line no-console */
			next(error);
		});
	},
};

module.exports = {
	/* for all the positive response */
	success: async (response, payload, statusCode = 200) => {
		response.status(statusCode).json({
			success: true,
			payload,
		});
	},
	/* for all the negative response */
	error: async (response, reason, statusCode = 400) => {
		response.status(statusCode).json({
			success: false,
			reason,
		});
	},
};

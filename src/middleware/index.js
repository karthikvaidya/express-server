const { validateAccessToken } = require('./token-management');
const { validateAccessPermission } = require('./access-management');

module.exports = {
	validateAccessToken,
	validateAccessPermission,
};

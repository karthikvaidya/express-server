const queries = require('./queries');
const { getAccessRights, getUserInfoForThisSession } = require('./manager');

module.exports = {
	queries,
	getAccessRights,
	getUserInfoForThisSession,
};

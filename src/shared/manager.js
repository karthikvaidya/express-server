const db = require('../database/postgre');
const queries = require('./queries');

const getAccessRights = async (role) => {
	const query = {
		text: queries.select.role,
		values: [role],
	};

	const result = await db.query.run(query);
	return result.rows[0];
};

const getUserInfoForThisSession = async (userId) => {
	const query = {
		text: queries.select.userId,
		values: [userId, 'false'],
	};

	const result = await db.query.run(query);
	return result.rowCount > 0 ? result.rows[0] : {};
};

module.exports = {
	getAccessRights,
	getUserInfoForThisSession,
};

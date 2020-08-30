const db = require('../../../database/postgre');
const queries = require('./queries');

const getByEmail = async (o) => {
	const query = {
		text: queries.select.email,
		values: [o.email],
	};

	const result = await db.query.run(query);
	return result.rowCount > 0 ? result.rows[0] : {};
};

const ensureUniqueUser = async (o) => {
	const query = {
		text: queries.select.ensure.byEmail,
		values: [o.email],
	};

	const result = await db.query.run(query);
	return result.rowCount > 0 ? result.rows[0] : {};
};

const getUserRole = async (o) => {
	const query = {
		text: queries.select.userRole,
		values: [o.userRole],
	};

	const result = await db.query.run(query);
	return result.rowCount > 0 ? result.rows[0] : {};
};

const createUser = async (o) => {
	const query = {
		text: queries.insert.user,
		values: [
			o.email,
			o.userId,
			o.userRole,
			o.lastName,
			o.password,
			o.firstName,
			o.userRoleId,
			o.phoneNumber,
			o.countryCode,
			`${o.firstName} ${o.lastName}`,
		],
	};

	const result = await db.query.run(query);
	return result;
};

module.exports = {
	getByEmail,
	createUser,
	getUserRole,
	ensureUniqueUser,
};

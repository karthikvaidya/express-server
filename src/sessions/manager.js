const has = require('lodash/has');

const db = require('../database/postgre');
const queries = require('./queries');

const get = async (o) => {
	let query = {
		text: queries.select.id,
		values: [o.sessionId, 'login'],
	};
	if (has(o, 'token')) {
		query = {
			text: queries.select.token,
			values: [o.token, 'login'],
		};
	}

	const result = await db.query.run(query);
	return result;
};

const insert = async (o) => {
	const query = {
		text: queries.insert.session,
		values: [
			o.sessionId,
			o.userId,
			o.token,
			o.startTime,
			o.deviceInfo,
			o.expirationTime,
			o.type,
		],
	};

	const result = await db.query.run(query);
	return result;
};

const destroy = async (o) => {
	const updateObj = {
		table: 'sessions',
		params: {
			updated_dt: 'now()',
			status: o.status || 'disabled',
		},
		conditions: {
			user_id: o.userId,
		},
	};

	const result = await db.query.update(updateObj);
	return result;
};

module.exports = {
	get,
	insert,
	destroy,
};

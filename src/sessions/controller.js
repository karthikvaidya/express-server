const _get = require('lodash/get');
const manager = require('./manager');
const { generateId, createAccessToken } = require('../utils');

const getExpirationTime = async (type) => {
	const today = new Date();
	switch (type) {
		/** 1 day */
		case 'login':
			return new Date(
				new Date(today).setHours(new Date(today).getHours() + 24)
			);

		default:
			return new Date(
				new Date(today).setHours(new Date(today).getHours() + 24)
			);
	}
};

const get = async (o) => {
	const result = await manager.get(o);
	return result;
};

const create = async (o) => {
	const sessionId = await generateId();
	const token = await createAccessToken({ ...o, sessionId });
	const params = {
		token,
		sessionId,
		userId: o.userId,
		type: o.tokenType,
		startTime: new Date(),
		deviceInfo: _get(o, 'deviceInfo', {}),
		expirationTime: await getExpirationTime(o.tokenType),
	};
	await manager.insert(params);
	return { sessionId, token };
};

const destroy = async (o) => {
	await manager.destroy(o);
	return true;
};

module.exports = {
	get,
	create,
	destroy,
};

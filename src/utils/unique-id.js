const generate = require('nanoid/async/generate');

const generateId = async (length) => {
	const alpha =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	const len = length || 15;
	const id = await generate(alpha, len);
	return id;
};

module.exports = generateId;

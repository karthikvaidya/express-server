const generateId = require('./unique-id');
const createAccessToken = require('./access-token');

const joinStrings = (array, joinDelimiter) => {
	if (typeof joinDelimiter === 'string') return array.join(joinDelimiter);
	if (typeof joinDelimiter === 'function') {
		let str = '';
		array.forEach((item, idx) => {
			str += joinDelimiter(item, idx) + item;
		});
		return str;
	}
};

const isValidEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

const hasSplCharacters = (str) => {
	const re = /[ `~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
	return re.test(str);
};

const isStrongPassword = (password) => {
	// const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/; don't allow spaces in password
	const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,32}$/; // Allow spaces in password
	if (password.match(regex)) {
		return true;
	}
	return false;
};

const getCurrentDateTime = () => {
	const date = new Date();
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	};
	return date.toLocaleTimeString('en-us', options);
};

module.exports = {
	generateId,
	joinStrings,
	isValidEmail,
	hasSplCharacters,
	isStrongPassword,
	createAccessToken,
	getCurrentDateTime,
};

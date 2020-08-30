const { includes, isEmpty, uniq } = require('lodash');

const { errorLog } = require('../../../../logs');
const { USER_ROLES } = require('../../../constants');
const responseHandler = require('../../../helpers/response-handler');
const { ensureUniqueUser, getUserRole } = require('./manager');
const {
	joinStrings,
	isValidEmail,
	hasSplCharacters,
	isStrongPassword,
} = require('../../../utils');

const hasValidSignUpFields = async (request, response, next) => {
	const validationFields = [];
	const params = { ...request.body };
	const {
		email,
		lastName,
		userRole,
		password,
		firstName,
		phoneNumber,
		countryCode,
	} = params;

	try {
		if (isEmpty(params)) {
			throw new Error('Missing fields');
		}

		if (isEmpty(firstName)) {
			validationFields.push('firstName');
		}

		if (firstName && isEmpty(firstName.trim())) {
			validationFields.push('firstName');
		}

		if (isEmpty(lastName)) {
			validationFields.push('lastName');
		}

		if (lastName && isEmpty(lastName.trim())) {
			validationFields.push('lastName');
		}

		if (isEmpty(userRole)) {
			validationFields.push('userRole');
		}

		if (userRole && !includes(USER_ROLES, userRole)) {
			validationFields.push('userRole');
		} else {
			const obj = await getUserRole({ userRole });
			params.userRoleId = obj.roleId;
		}

		if (isEmpty(email)) {
			validationFields.push('email');
		}

		if (email && (isEmpty(email.trim()) || !isValidEmail(email))) {
			validationFields.push('email');
		}

		if (email) {
			const mail = email.toLowerCase();
			const obj = await ensureUniqueUser({ email: mail });
			if (isEmpty(obj)) {
				params.email = mail;
			} else {
				throw new Error(`User with email address ${mail} already exists`);
			}
		}

		if (isEmpty(password)) {
			validationFields.push('password');
		}

		if (password && isEmpty(password.trim())) {
			validationFields.push('password');
		}

		if (
			(countryCode && isEmpty(countryCode.trim())) ||
			hasSplCharacters(countryCode)
		) {
			validationFields.push('countryCode');
		}

		if (
			(phoneNumber && isEmpty(phoneNumber.trim())) ||
			hasSplCharacters(phoneNumber)
		) {
			validationFields.push('phoneNumber');
		}

		if (phoneNumber || countryCode) {
			if (isEmpty(countryCode)) validationFields.push('countryCode');
			if (isEmpty(phoneNumber)) validationFields.push('phoneNumber');
		}

		if (validationFields.length) {
			const msg = `Please enter valid ${joinStrings(
				uniq(validationFields),
				(item, idx) => {
					if (validationFields.length === 1) return '';
					if (idx > 0 && idx < validationFields.length - 1) return ', ';
					if (idx === validationFields.length - 1) return ' and ';
					return '';
				}
			)}.`;
			throw new Error(msg);
		}

		if (password && !isStrongPassword(password)) {
			throw new Error(
				'Password should be 8 to 32 characters long, which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
			);
		}

		request.verifiedParams = params;
		return next();
	} catch (error) {
		errorLog(error);
		const code = error.name === 'Error' ? 400 : 500;
		return responseHandler.error(response, error.message, code);
	}
};

const hasValidLoginFields = async (request, response, next) => {
	const validationFields = [];
	const params = { ...request.body };
	const { email, password } = params;

	try {
		if (isEmpty(params)) {
			throw new Error('Missing fields');
		}

		if (isEmpty(email)) {
			validationFields.push('email');
		}

		if (email && (isEmpty(email.trim()) || !isValidEmail(email))) {
			validationFields.push('email');
		}

		if (email && password) {
			const mail = email.toLowerCase();
			const obj = await ensureUniqueUser({ email: mail });
			if (isEmpty(obj)) {
				throw new Error(`Invalid email or password`);
			} else {
				params.email = mail;
			}
		}

		if (isEmpty(password)) {
			validationFields.push('password');
		}

		if (validationFields.length) {
			const msg = `Please enter valid ${joinStrings(
				uniq(validationFields),
				(item, idx) => {
					if (validationFields.length === 1) return '';
					if (idx > 0 && idx < validationFields.length - 1) return ', ';
					if (idx === validationFields.length - 1) return ' and ';
					return '';
				}
			)}.`;
			throw new Error(msg);
		}

		request.verifiedParams = params;
		return next();
	} catch (error) {
		errorLog(error);
		const code = error.name === 'Error' ? 400 : 500;
		return responseHandler.error(response, error.message, code);
	}
};

module.exports = {
	hasValidLoginFields,
	hasValidSignUpFields,
};

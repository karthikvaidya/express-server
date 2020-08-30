const { includes, isEmpty, uniq } = require('lodash');

const { errorLog } = require('../../../../logs');
const responseHandler = require('../../../helpers/response-handler');
const { joinStrings, isValidDataType } = require('../../../utils');
const { getStory } = require('./manager');
const {
	COMPLEXITIES,
	STORY_TYPES,
	VALID_STATUS,
} = require('../../../constants');

const hasValidCreateFields = async (request, response, next) => {
	const validationFields = [];
	const params = { ...request.body };
	params.status = 'new';
	const {
		name,
		cost,
		summary,
		storyType,
		complexity,
		description,
		estimatedTime,
	} = params;

	try {
		if (isEmpty(params)) {
			throw new Error('Missing fields');
		}

		if (isEmpty(name)) {
			validationFields.push('name');
		}

		if (name && isEmpty(name.trim())) {
			validationFields.push('name');
		}

		if (isEmpty(cost)) {
			validationFields.push('cost');
		}

		if (cost && isEmpty(cost.trim())) {
			validationFields.push('cost');
		}

		if (isEmpty(summary)) {
			validationFields.push('summary');
		}

		if (summary && isEmpty(summary.trim())) {
			validationFields.push('summary');
		}

		if (isEmpty(storyType)) {
			validationFields.push('storyType');
		}

		if (!isValidDataType(storyType, 'string')) {
			validationFields.push('storyType');
		}

		if (storyType && !includes(STORY_TYPES, storyType)) {
			validationFields.push('storyType');
		}

		if (isEmpty(complexity)) {
			validationFields.push('complexity');
		}

		if (!isValidDataType(complexity, 'string')) {
			validationFields.push('complexity');
		}

		if (complexity && !includes(COMPLEXITIES, complexity)) {
			validationFields.push('complexity');
		}

		if (isEmpty(description)) {
			validationFields.push('description');
		}

		if (description && isEmpty(description.trim())) {
			validationFields.push('description');
		}

		if (isEmpty(estimatedTime)) {
			validationFields.push('estimatedTime');
		}

		if (estimatedTime && isEmpty(estimatedTime.trim())) {
			validationFields.push('estimatedTime');
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

const isValidStory = async (request, response, next) => {
	const validationFields = [];
	const params = { ...request.body, ...request.params };
	const verifiedUser = { ...request.verifiedUser };

	const {
		name,
		cost,
		status,
		storyId,
		summary,
		storyType,
		complexity,
		description,
		estimatedTime,
	} = params;

	try {
		if (isEmpty(params)) {
			throw new Error('Missing fields');
		}

		if (isEmpty(storyId)) {
			validationFields.push('storyId');
		}

		if (storyId && isEmpty(storyId.trim())) {
			validationFields.push('storyId');
		}

		const obj = await getStory({ storyId });
		if (isEmpty(obj)) {
			throw new Error('Invalid storyId');
		} else if (
			verifiedUser.role !== 'admin' &&
			obj.userId !== verifiedUser.userId
		) {
			throw new Error('Forbidden');
		}

		if (status) {
			if (verifiedUser.role !== 'admin') {
				throw new Error(
					'Forbidden. you are not allowed to change the story status'
				);
			}
			if (status && isEmpty(status.trim())) {
				throw new Error('Invalid status');
			}
			if (status && !includes(VALID_STATUS, status)) {
				throw new Error('Invalid status');
			}
		}

		if (name && isEmpty(name.trim())) {
			validationFields.push('name');
		}

		if (cost && isEmpty(cost.trim())) {
			validationFields.push('cost');
		}

		if (summary && isEmpty(summary.trim())) {
			validationFields.push('summary');
		}

		if (!isValidDataType(storyType, 'string')) {
			validationFields.push('storyType');
		}

		if (storyType && !includes(STORY_TYPES, storyType)) {
			validationFields.push('storyType');
		}

		if (!isValidDataType(complexity, 'string')) {
			validationFields.push('complexity');
		}

		if (complexity && !includes(COMPLEXITIES, complexity)) {
			validationFields.push('complexity');
		}

		if (description && isEmpty(description.trim())) {
			validationFields.push('description');
		}

		if (estimatedTime && isEmpty(estimatedTime.trim())) {
			validationFields.push('estimatedTime');
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

		/** Remove all null, empty & undefined values  */
		Object.keys(params).forEach(
			(i) => !params[i] && params[i] !== undefined && delete params[i]
		);

		request.verifiedParams = params;
		return next();
	} catch (error) {
		errorLog(error);
		const code = error.name === 'Error' ? 400 : 500;
		return responseHandler.error(response, error.message, code);
	}
};
module.exports = {
	isValidStory,
	hasValidCreateFields,
};

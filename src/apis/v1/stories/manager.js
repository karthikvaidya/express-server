const { forEach, has, toNumber } = require('lodash');
const db = require('../../../database/postgre');
const queries = require('./queries');

const createStory = async (o) => {
	const query = {
		text: queries.insert.story,
		values: [
			o.name,
			o.cost,
			o.status,
			o.userId,
			o.storyId,
			o.summary,
			o.storyType,
			o.complexity,
			o.description,
			o.estimatedTime,
		],
	};

	const result = await db.query.run(query);
	return result;
};

const getStory = async (o) => {
	const query = {
		text: queries.select.story,
		values: [o.storyId],
	};
	const result = await db.query.run(query);
	return result.rowCount > 0 ? result.rows[0] : {};
};

const listStories = async (o) => {
	const query = {
		text: queries.select.list[o.role],
		values: [o.limit || 10, o.offset || null],
	};

	if (o.role === 'user') query.values.push(o.userId);

	const result = await db.query.run(query);
	return result.rowCount > 0 ? result.rows : {};
};

const listCount = async (o) => {
	const query = {
		text: queries.count[o.role],
		values: [],
	};

	if (o.role === 'user') query.values.push(o.userId);

	const result = await db.query.run(query);
	return result.rowCount > 0 ? toNumber(result.rows[0].count) : 0;
};

const editStory = async (o) => {
	const allowed = {
		name: 'name',
		cost: 'cost',
		status: 'status',
		summary: 'summary',
		storyType: 'story_type',
		complexity: 'complexity',
		description: 'description',
		estimatedTime: 'estimated_time',
	};

	const updateObj = {
		table: 'stories',
		params: {
			updated_dt: 'now()',
		},
		conditions: {
			story_id: o.storyId,
		},
	};

	const requestedFields = Object.keys(o);
	forEach(requestedFields, (val) => {
		if (has(allowed, val)) {
			updateObj.params[allowed[val]] = o[val];
		}
	});

	const result = await db.query.update(updateObj);
	return result;
};

module.exports = {
	getStory,
	editStory,
	listCount,
	listStories,
	createStory,
};

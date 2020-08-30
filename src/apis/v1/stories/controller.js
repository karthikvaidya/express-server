const manager = require('./manager');
const { generateId } = require('../../../utils');
const responseHandler = require('../../../helpers/response-handler');

const createStory = async (request, response) => {
	const params = { ...request.verifiedParams };
	const storyId = await generateId();
	params.storyId = storyId;
	params.userId = request.verifiedUser.userId;
	await manager.createStory(params);
	return responseHandler.success(response, { storyId }, 201);
};

const editStory = async (request, response) => {
	const params = { ...request.verifiedParams };
	await manager.editStory(params);
	return responseHandler.success(response, {}, 200);
};

const listStories = async (request, response) => {
	const params = { ...request.query };
	params.role = request.verifiedUser.role;
	params.userId = request.verifiedUser.userId;
	const stories = await manager.listStories(params);
	const total = await manager.listCount(params);
	return responseHandler.success(response, { total, stories }, 200);
};

module.exports = {
	editStory,
	createStory,
	listStories,
};

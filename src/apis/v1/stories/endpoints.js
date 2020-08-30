const { listStories, editStory, createStory } = require('./controller');
const { isValidStory, hasValidCreateFields } = require('./middleware');
const {
	validateAccessToken,
	validateAccessPermission,
} = require('../../../middleware');

module.exports = {
	baseUrl: '/story',
	create: {
		url: '/',
		method: 'post',
		controller: createStory,
		middleware: [
			validateAccessToken,
			validateAccessPermission,
			hasValidCreateFields,
		],
	},
	edit: {
		url: '/:storyId',
		method: 'put',
		controller: editStory,
		middleware: [validateAccessToken, validateAccessPermission, isValidStory],
	},
	get: {
		list: {
			url: '/',
			method: 'get',
			controller: listStories,
			middleware: [validateAccessToken, validateAccessPermission],
		},
	},
};

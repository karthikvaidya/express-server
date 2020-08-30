const { authLogin, authSignup } = require('./controller');
const { hasValidLoginFields, hasValidSignUpFields } = require('./middleware');

module.exports = {
	baseUrl: '/auth',
	login: {
		url: '/login',
		method: 'post',
		controller: authLogin,
		middleware: [hasValidLoginFields],
	},
	signup: {
		url: '/signup',
		method: 'post',
		controller: authSignup,
		middleware: [hasValidSignUpFields],
	},
};

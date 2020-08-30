const router = require('express').Router();

const { login, signup } = require('./endpoints');
const { handleExceptions } = require('../../../helpers/error-handler');

router[login.method](
	login.url,
	login.middleware,
	handleExceptions(login.controller)
);
router[signup.method](
	signup.url,
	signup.middleware,
	handleExceptions(signup.controller)
);

module.exports = router;

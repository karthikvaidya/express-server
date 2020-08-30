const router = require('express').Router();

const { create, edit, get } = require('./endpoints');
const { handleExceptions } = require('../../../helpers/error-handler');

router[create.method](
	create.url,
	create.middleware,
	handleExceptions(create.controller)
);
router[edit.method](
	edit.url,
	edit.middleware,
	handleExceptions(edit.controller)
);
router[get.list.method](
	get.list.url,
	get.list.middleware,
	handleExceptions(get.list.controller)
);

module.exports = router;

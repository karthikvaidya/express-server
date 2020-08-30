/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();

const baseUrl = '../apis/v1';

router.use('/auth', require(`${baseUrl}/authorization/routes`));
router.use('/story', require(`${baseUrl}/stories/routes`));

module.exports = router;

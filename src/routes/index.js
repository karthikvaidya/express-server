/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();

const baseUrl = '../apis/v1';

router.use('/auth', require(`${baseUrl}/authorization/routes`));

module.exports = router;

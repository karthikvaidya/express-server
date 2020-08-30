const query = require('./postgre');
const { establishConnection } = require('./connect');

module.exports = {
	query,
	initDbConnection: establishConnection,
};

const { Pool } = require('pg');

const { APP_STORE } = require('../../config');
const { errorLog, databaseLog } = require('../../../logs');

let pool = new Pool();

pool.on('error', (error, client) => {
	errorLog('Error occurred on idle database pooling client');
	errorLog(error);
});

const establishConnection = async () => {
	try {
		pool = new Pool(APP_STORE.get('dbConfig'));
		return { success: true, host: APP_STORE.get('dbConfig').host };
	} catch (error) {
		errorLog('Initial database connection error');
		errorLog(error);
		throw error;
	}
};

const exec = async (query) => {
	let client;
	try {
		client = await pool.connect();
		databaseLog({ message: 'executing query', query });
		const result = await client.query(query);
		client.release();
		return result;
	} catch (error) {
		if (client) client.release();
		errorLog('Something went wrong when executing query');
		errorLog(error);
		throw error;
	}
};

module.exports = { exec, establishConnection };

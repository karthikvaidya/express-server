const { APP_ENV } = process.env;
const APP_STORE = new Map();

const VERSION = {
	v1: '/api/v1',
};

const JWT = {
	secret: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
	expiration: {
		login: 86400 /* in seconds -> 24 hours */,
	},
};

const postgreDBConfig = {
	user: 'awsuser',
	host: 'localhost',
	database: 'postgres',
	password: 'test1234',
	port: 5432,
};

APP_STORE.set('dbConfig', postgreDBConfig);

module.exports = {
	JWT,
	VERSION,
	APP_ENV,
	APP_STORE,
};

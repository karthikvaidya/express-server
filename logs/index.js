const { transports, createLogger, format } = require('winston');

/**
 * Error log - records all the errors that occurs anywhere in the system
 */

const error = createLogger({
	level: 'error',
	format: format.combine(
		format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }),
		format.json()
	),
	transports: [
		new transports.Console(),
		new transports.File({
			filename: `${__dirname}/error.log`,
			level: 'error',
		}),
	],
});

/**
 * Access log - use this to log the calls made to routes. Ex Apache's access logs
 */

const access = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }),
		format.json()
	),
	transports: [
		new transports.Console(),
		new transports.File({
			filename: `${__dirname}/access.log`,
			level: 'info',
		}),
	],
});

/**
 * Database log - use this to store the data & queries if db operation fails. And later save it to db when db connection is back
 */

const database = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }),
		format.json()
	),
	transports: [
		new transports.Console(),
		new transports.File({
			filename: `${__dirname}/database.log`,
			level: 'info',
		}),
	],
});

/**
 * Database log - use this to log any checkpoints or debugging information
 */

const stacktrace = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }),
		format.json()
	),
	transports: [
		new transports.Console(),
		new transports.File({
			filename: `${__dirname}/stacktrace.log`,
			level: 'info',
		}),
	],
});

module.exports = {
	/* logging the data */
	errorLog: (data) => {
		error.log('error', { error: data.message || data, stack: data.stack });
	},
	accessLog: (data) => {
		access.log('info', data);
	},
	databaseLog: (data) => {
		database.log('info', data);
	},
	stackTrace: (data) => {
		stacktrace.log('info', data);
	},
};

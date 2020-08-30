const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { initDbConnection } = require('./database/postgre');
const { stackTrace, errorLog } = require('../logs');
const { handle404Error, handleDevErrors } = require('./helpers/error-handler');
const { APP_ENV, VERSION } = require('./config');

const app = express();

/**
 * Add required configurations for application
 */

app.use(cors());
app.use(compression());
app.use(express.json({ limit: '200mb', extended: true }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

/**
 * Initialize application
 */
const initApp = async () => {
	try {
		stackTrace(`server is in ${APP_ENV} environment`);
		const db = await initDbConnection();
		stackTrace(`database connection established with ${db.host}`);
	} catch (error) {
		errorLog(error);
	}
};

/**
 * Import all required routes
 */
app.use(VERSION.v1, routes);

/**
 * Error Handlers
 */
app.use(handle404Error);
app.use(handleDevErrors);

module.exports = { app, initApp };

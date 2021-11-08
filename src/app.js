const express = require('express')
const app = express();
const config = require('./config/config');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const morgan = require('./config/morgan');
var path = require('path');
const { errorConverter, errorHandler } = require('./middlewares/error');
const { authLimiter } = require('./middlewares/rate-limiter');
const routes = require('./routes');

// IMPORT SESSION MANAGER
const sessionparameter = require('./utils/sessionmanager');

// APPLICATION SETUP

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use(sessionparameter);

// static assets
app.use(express.static(path.join(__dirname, 'assets')));

// for using node module assets
app.use('/modules', express.static(path.join(__dirname, '../node_modules')));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

//set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
    app.use('/auth', authLimiter);
}

// routers
app.use('/', routes);

app.get('*', function (req, res) {
    res.render('404', { baseurl: config.baseurl });
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
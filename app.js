const express = require('express')
const app = express();
const { port } = require('./utils/constants');

// IMPORT LOGGER
const requestLogger = require('./utils/logger');

// IMPORT SESSION MANAGER
const { sessionparameter } = require('./utils/sessionmanager');

// IMPORT COOKIE PARSER
const cookieParser = require("cookie-parser");

const mongooseconnection = require('./utils/mongoose');

// ROUTE IMPORTS
const baseroute = require('./routes/baseroute');
const authroute = require('./routes/auth');

// APPLICATION SETUP

app.use(cookieParser());

app.use(sessionparameter);

app.use(requestLogger);

app.use(express.static('assets'));

app.use('/modules', express.static(__dirname + '/node_modules/'));

app.use(express.json());

app.use(express.urlencoded());

app.set('view engine', 'ejs');

// Setting Up Routers

app.use('/', baseroute);
app.use('/auth', authroute);

app.listen(port, () => {
    console.log(`CRMJAX server listening at http://localhost:${port}`);
    mongooseconnection().then((success) => {
        console.log('Connected to DB at crmjax.lcgxi.mongodb.net');
    }).catch((err) => {
        console.log('Error connecting the database');
    });
});

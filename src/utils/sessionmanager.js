const oneDay = 1000 * 60 * 60 * 24;
var jwt = require('express-jwt');
var session = require('express-session');
const accessTokenSecret = require('../config/config').jwt.secret;

const sessionparameter = session({
    secret: accessTokenSecret,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false
});

module.exports = sessionparameter;
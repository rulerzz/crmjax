const oneDay = 1000 * 60 * 60 * 24;
var jwt = require('express-jwt');
var session = require('express-session');

const accessTokenSecret = '$2b$10$pzXwJSjpaZDM.W0FbFjK..ubsqXG4psNVdzj0N.CZPR1xSyzV309u';

const sessionparameter = session({
    secret: accessTokenSecret,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false
});

const sessiontoken = jwt({
    secret: 'shhhhhhared-secret',
    algorithms: ['HS256']
});

module.exports = { sessiontoken, accessTokenSecret, sessionparameter };
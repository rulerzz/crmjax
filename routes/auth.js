let express = require('express');
let authrouter = express.Router();
let { emailMatch, registerUser } = require('../services/user');
const { baseurl } = require('../utils/constants');

authrouter.get('/login', function (req, res) {
    res.render('index', { baseurl: baseurl, mode: 'login', alert: false });
});

authrouter.post('/login', function (req, res) {
    emailMatch(req, res).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    });
});

authrouter.get('/register', function (req, res) {
    res.render('index', { baseurl: baseurl, mode: 'register', alert: false });
});

authrouter.post('/register', function (req, res) {
    registerUser(req, res).then((success) => {
        console.log('User created succesfully with ID ' + success.id);
        res.render('index', { baseurl: baseurl, alert: true, messagetype: 'success', message: 'User created successfully!', mode: 'login' });
    }).catch((err) => {
        console.log(err);
        res.render('index', { baseurl: baseurl, alert: true, messagetype: 'alert', message: 'Could not create user!', mode: 'register' });
    })
});

module.exports = authrouter;
let express = require('express');
let authrouter = express.Router();
let { emailMatch, registerUser } = require('../services/user');
let { createAccessToken } = require('../services/session');
const { baseurl } = require('../utils/constants');

authrouter.get('/login', function (req, res) {
    if (req.session.userid)
    res.redirect('/');
    else
    res.render('index', { baseurl: baseurl, mode: 'login', alert: false });
});

authrouter.post('/login', function (req, res) {
    emailMatch(req, res).then((data) => {
        if (data) {
            // Password match
            data.comparePassword(req.body.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    console.log('User [' + req.body.email + '] session started at ' + Date.now());
                    createAccessToken(req, res).then((accesstoken) => {
                        req.session.userid = accesstoken;
                        res.redirect('/');
                    }).catch((err) => {
                        res.render('index', { baseurl: baseurl, alert: true, messagetype: 'alert', message: 'Session Could Not Be Created!', mode: 'login' });
                    });
                }
                else
                    res.render('index', { baseurl: baseurl, alert: true, messagetype: 'alert', message: 'Invalid Credentials!', mode: 'login' });
            });
        } else {
            console.log('No user match found for email [' + req.body.email + ']');
            res.render('index', { baseurl: baseurl, alert: true, messagetype: 'alert', message: 'No such user found!', mode: 'login' });
        }
    }).catch((err) => {
        console.log(err);
        res.render('index', { baseurl: baseurl, alert: true, messagetype: 'alert', message: 'User login failed!', mode: 'login' });
    });
});

authrouter.get('/register', function (req, res) {
    if (req.session.userid)
    res.redirect('/');
    else
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
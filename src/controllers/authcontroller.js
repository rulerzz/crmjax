let { emailMatch, registerUser } = require('../services/user');
let sessionservice = require('../services/session');
const baseurl = require('../config/config').baseurl;
const catchAsync = require('../utils/catchAsync');

const serveloginpage = catchAsync(async function (req, res) {
    if (req.session.accesstoken)
        sessionservice.getAccessToken(req, res).then((data) => {
            res.redirect('/');
        }).catch(err => {
            res.render('index', { baseurl: baseurl, mode: 'login', alert: false });
        });
    else
        res.render('index', { baseurl: baseurl, mode: 'login', alert: false });
});

const loginhandeller = catchAsync(async function (req, res) {
    emailMatch(req, res).then((data) => {
        if (data) {
            // Password match
            data.comparePassword(req.body.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    console.log('[ Session Log : session started for ' + req.body.email + '] @ ' + new Date());
                    sessionservice.createAccessToken(req, res).then((accesstoken) => {
                        req.session.accesstoken = accesstoken;
                        req.session.useremail = req.body.email;
                        res.redirect('/');
                    }).catch((err) => {
                        res.render('index', { baseurl: baseurl, alert: true, messagetype: 'alert', message: 'Session Could Not Be Created!', mode: 'login', formdata: req.body });
                    });
                }
                else
                    res.render('index', { baseurl: baseurl, alert: true, messagetype: 'alert', message: 'Invalid Credentials!', mode: 'login', formdata: req.body });
            });
        } else {
            console.log('No user match found for email [' + req.body.email + ']');
            res.render('index', { baseurl: baseurl, alert: true, messagetype: 'alert', message: 'No such user found!', mode: 'login', formdata: req.body });
        }
    }).catch((err) => {
        console.log(err);
        res.render('index', { baseurl: baseurl, alert: true, messagetype: 'alert', message: 'User login failed!', mode: 'login', formdata: req.body });
    });
});

const serveregisterpage = catchAsync(async function (req, res) {
    if (req.session.accesstoken)
        sessionservice.getAccessToken(req, res).then((data) => {
            res.redirect('/');
        }).catch(err => {
            res.render('index', { baseurl: baseurl, mode: 'register', alert: false });
        });
    else
        res.render('index', { baseurl: baseurl, mode: 'register', alert: false });
});

const registerhandeller = catchAsync(async function (req, res) {
    registerUser(req, res).then((success) => {
        console.log('User created succesfully with ID ' + success.id);
        res.render('index', { baseurl: baseurl, alert: true, messagetype: 'success', message: 'User created successfully!', mode: 'login' });
    }).catch((err) => {
        console.log(err);
        res.render('index', { baseurl: baseurl, alert: true, messagetype: 'alert', message: 'Could not create user!', mode: 'register', formdata: req.body });
    })
});

module.exports = { serveloginpage, loginhandeller, serveregisterpage, registerhandeller };
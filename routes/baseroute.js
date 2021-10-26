var express = require('express');
var baserouter = express.Router();
const { baseurl } = require('../utils/constants');

baserouter.get('/', function (req, res) {
  if (req.session.userid)
    res.redirect('dashboard');
  else
    res.redirect('auth/login');
});

baserouter.get('/logout', function (req, res) {
  if (req.session.userid) {
    req.session.destroy();
    res.redirect('/');
  }
});

module.exports = baserouter;
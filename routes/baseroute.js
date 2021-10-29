var express = require('express');
var baserouter = express.Router();
const { baseurl } = require('../utils/constants');
let { authenticateToken } = require('../services/session');

baserouter.get('/', authenticateToken, function (req, res) {
  res.redirect('dashboard');
});

baserouter.get('/logout', authenticateToken, function (req, res) {
  req.session.destroy();
  res.redirect(baseurl + 'auth/login');
});

module.exports = baserouter;
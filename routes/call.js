var express = require('express');
var callroute = express.Router();
const { baseurl } = require('../utils/constants');
let { authenticateToken } = require('../services/session');

callroute.post('/create', authenticateToken, function (req, res) {
});
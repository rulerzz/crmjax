var express = require('express');
var baserouter = express.Router();
const { baseurl } = require('../utils/constants');
let session = false;
 
baserouter.get('/', function (req, res) {
  if(session)
  res.render('index', { baseurl: baseurl });
  else
  res.redirect('auth/login');
});

module.exports = baserouter;
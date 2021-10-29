const userModel = require('../models/userModel');
let ProgramError = require('../errors/ProgramError');
let { accessTokenSecret } = require('../utils/sessionmanager');
const jwt = require('jsonwebtoken');
const { baseurl } = require('../utils/constants');

const createAccessToken = async function (req, res) {
    let accessToken = await jwt.sign({ username: req.body.email }, accessTokenSecret);
    return accessToken;
};

const getAccessToken = async function (req, res) {
    let decodedData = await jwt.verify(req.session.userid, accessTokenSecret);
    return decodedData;
};

const authenticateToken = async (req, res, next) => {
  const token = req.session.userid;
  if (!token) {
    res.redirect(baseurl + 'auth/login');
  } else {
    jwt.verify(token, accessTokenSecret, (err, data) => {
      if (err) return res.redirect('/');
      console.log('[ Token Check Log : ' + data.username + ' ]');
      next();
    });
  }
};

module.exports = { createAccessToken, getAccessToken, authenticateToken };
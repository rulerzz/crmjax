let accessTokenSecret = require('../config/config').jwt.secret;
const jwt = require('jsonwebtoken');
const baseurl = require('../config/config').baseurl;

const createAccessToken = async function (req, res) {
    let accessToken = await jwt.sign(req.body.email , accessTokenSecret);
    return accessToken;
};

const getAccessToken = async function (req, res) {
    let decodedData = await jwt.verify(req.session.accesstoken, accessTokenSecret);
    return decodedData;
};

const authenticateToken = async (req, res, next) => {
  const token = req.session.accesstoken;
  if (!token) {
    res.redirect(baseurl + 'auth/login');
  } else {
    jwt.verify(token, accessTokenSecret, (err, data) => {
      if (err) return res.redirect('/');
      next();
    });
  }
};

module.exports = { createAccessToken, getAccessToken, authenticateToken };
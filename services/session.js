const userModel = require('../models/userModel');
let ProgramError = require('../errors/ProgramError');
let { accessTokenSecret } = require('../utils/sessionmanager');
const jwt = require('jsonwebtoken');

let createAccessToken = async function (req, res) {
    let accessToken = await jwt.sign({ username: req.body.email }, accessTokenSecret);
    return accessToken;
};

module.exports = { createAccessToken };
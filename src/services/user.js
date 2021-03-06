const userModel = require('../models/userModel');

let emailMatch = async function (req, res) {
    let result = await userModel.findOne({ email: req.body.email });
    return result;
};

let searchUserByEmail = async function (email) {
    let result = await userModel.findOne({ email: email });
    return result;
};

let registerUser = async function (req, res) {
    let user = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        date: req.body.date ? req.body.date : Date.now(),
        status: true
    });
    return user;
};

module.exports = { emailMatch, registerUser, searchUserByEmail };
const activityModel = require('../models/activityModel');
const callModel = require('../models/callModel');
const userService = require('./user');

const createActivity = async function (req, res) {
    let user = await userService.searchUserByEmail(req.session.useremail);
    let activity = await activityModel.create({
        subject: req.body.subject,
        type: req.body.type,
        owner: user._id,
        status: 'OPEN'
    });
    return activity;
};

const createCall = async function (req, res) {
    let call = await callModel.create({
        contactname: req.body.contact_name,
        subject: req.body.subject,
        purpose: req.body.purpose,
        relatedTo: req.body.related_to,
        type: req.body.call_type,
        details: req.body.call_detail,
        dateTime: req.body.call_start_date,
        duration: req.body.call_duration_from + ' : ' +req.body.call_duration_to,
        description: req.body.description,
        result: req.body.callresult   
    });
    let user = await userService.searchUserByEmail(req.session.useremail);
    let activity = await activityModel.create({
        subject: req.body.subject,
        type: req.body.type,
        callid: call._id,
        owner: user._id,
        status: 'OPEN'
    });
    return activity;
};

module.exports = {
    createActivity,
    createCall
};
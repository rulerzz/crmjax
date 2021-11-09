const catchAsync = require('../utils/catchAsync');
const activityService = require('../services/activity');

const createActivity = catchAsync(async function (req, res) {
    let activity = await activityService.createActivity(req, res);
    res.status(201);
    res.json(activity);
});

const createCall = catchAsync(async function (req, res) {
    let activity = await activityService.createCall(req, res);
    res.status(201);
    res.json(activity);
});

module.exports = { createActivity, createCall };
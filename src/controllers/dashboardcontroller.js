const baseurl = require('../config/config').baseurl;
const catchAsync = require('../utils/catchAsync');

const loadindex = catchAsync(async function (req, res) {
    res.render('index', { baseurl: baseurl, mode: "loggedin" });
});

const createcall = catchAsync(async function (req, res) {
    res.render('index', { baseurl: baseurl, mode: "createcall" });
});

const createmeeting = catchAsync(async function (req, res) {
    res.render('index', { baseurl: baseurl, mode: "createmeeting" });
});

const createtask = catchAsync(async function (req, res) {
    res.render('index', { baseurl: baseurl, mode: "createtask" });
});

module.exports = {
    loadindex,
    createcall,
    createmeeting,
    createtask
}
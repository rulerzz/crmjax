const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');

const loadindex = catchAsync(async function (req, res) {
    res.redirect('dashboard');
});

const destroysession = catchAsync(async function (req, res) {
    req.session.destroy();
    res.redirect(config.baseurl + 'auth/login');
});

module.exports = {
    loadindex,
    destroysession
}
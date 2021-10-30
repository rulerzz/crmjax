var express = require('express');
var router = express.Router();
let { authenticateToken } = require('../services/session');

router.post('/create', authenticateToken, function (req, res) {
});

module.exports = router;
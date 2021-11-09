var express = require('express');
var router = express.Router();
let { authenticateToken } = require('../services/session');
var callController = require('../controllers/callcontroller');

router.post('/createcall', authenticateToken, callController.createCall);

module.exports = router;
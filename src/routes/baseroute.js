var express = require('express');
var router = express.Router();
let { authenticateToken } = require('../services/session');
const basecontroller = require('../controllers/basecontroller');

router.get('/', authenticateToken, basecontroller.loadindex );
router.get('/logout', authenticateToken, basecontroller.destroysession );

module.exports = router;
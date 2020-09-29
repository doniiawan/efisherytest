var express = require('express');
var router = express.Router();

//API version 1
router.use('/api/v1', require('./v1'));
router.use('/auth', require('./auth'));

module.exports = router;
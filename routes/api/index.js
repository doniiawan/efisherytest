var express = require('express');
var router = express.Router();

//API version 1
router.use('/auth', require('./public/auth'));
router.use('/user', require('./public/user'));
router.use('/api/v1', require('./v1'));

module.exports = router;
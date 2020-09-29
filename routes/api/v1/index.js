var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
// router.use('/route2', require('./route2'));

module.exports = router;
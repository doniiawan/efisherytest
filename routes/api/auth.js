var express = require('express');
var router = express.Router();

router.route('/')
  .post(post);

function post(req, res) {
  res.status(200).json([{ token: 'test'}])
}


module.exports = router;
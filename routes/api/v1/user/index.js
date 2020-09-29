var express = require('express')
var router = express.Router()

router.route('/')
  .get(getRouteHandler)
  .post(postRouteHandler);

function getRouteHandler(req, res) {
  //handle GET route here
  res.status(200).json([{ error: 'SYAUQI' }, { error: 'SYAUQI' }, { error: 'SYAUQI' }, { error: 'SYAUQI' }, { error: 'SYAUQI' }, { error: 'SYAUQI' }])
}

function postRouteHandler(req, res) {
  //handle POST route here
}

module.exports = router;
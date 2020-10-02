var express = require('express')
var router = express.Router()

router.route('/')
  .get(getRouteHandler)

function getRouteHandler(req, res) {
  let payload = res.locals.authuser
  delete payload.iat
  delete payload.exp
  res.status(200).json(payload)
}

module.exports = router;
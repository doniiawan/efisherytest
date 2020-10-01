var express = require('express');
var router = express.Router();
// db users
var db = require('../../../database/sqlite');
// jwt libs
const jsonwebtoken = require('jsonwebtoken');
const secret = process.env.SECRET || 'qwerty123654'


router.route('/')
  .post(post);

async function post(req, res) {
  // console.log(req.body)
  const payload = req.body
  if (payload !== null && payload !== undefined) {
    if (payload.phone !== null && payload.password !== null && payload.phone !== undefined && payload.password !== undefined) {
      var sql = "SELECT * FROM user WHERE phone = ? AND password = ? LIMIT 1"
      var params = [payload.phone, payload.password]
      await db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({ "error": err.message });
        }
        if (row !== undefined || row !== null) {
          var token = jsonwebtoken.sign({
            name: row.name,
            phone: row.phone,
            role: row.role,
            timestamp: row.timestamp
          }, secret, { expiresIn: '1h' });
          res.status(200).json({ code: 200, token: token })
        } else {
          res.status(400).json({ code: 400, message: 'Invalid phone or password!' })
        }
      });
    } else {
      res.status(400).json({ code: 400, message: 'Insufficient payload for phone or password' })
    }
  } else {
    res.status(400).json({ code: 400, message: 'Insufficient payload for phone or password' })
  }
}

module.exports = router;
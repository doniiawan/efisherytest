var express = require('express');
var router = express.Router();
// db users
var db = require('../../../database/sqlite');
// jwt libs
const jsonwebtoken = require('jsonwebtoken');
const secret = process.env.SECRET || 'qwerty123654'
// bcrypt libs
const bcrypt = require('bcrypt');


router.route('/')
  .post(post);

async function post(req, res) {
  try {
    const payload = req.body
    if (payload !== null && payload !== undefined) {
      if (payload.phone !== null && payload.name !== null && payload.role !== null && payload.phone !== undefined && payload.name !== undefined && payload.role !== undefined) {
        let password = await generatePassword()
        var sql = 'INSERT INTO user (phone, name, role, password) VALUES (?,?,?,?)'
        var params = [payload.phone, payload.name, payload.role, password]
        await db.run(sql, params, (err, row) => {
          if (err) {
            res.status(400).json({ "error": err.message });
          } else {
            res.status(200).json({ code: 200, password: password })
          }
        });
      } else {
        res.status(400).json({ code: 400, message: 'Insufficient payload for phone / name / role' })
      }
    } else {
      res.status(400).json({ code: 400, message: 'Insufficient payload for phone / name / role' })
    }

  } catch (error) {
    res.status(400).json({ code: 400, message: error })
  }
}

function generatePassword() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = router;
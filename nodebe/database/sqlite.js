var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = './database/user.sqlite'

let db = new sqlite3.Database(DBSOURCE, (err) => {
  try {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } else {
      console.log('Connected!')

      db.run(`CREATE TABLE user (
              phone text PRIMARY KEY,
              name text,
              password text,
              role text DEFAULT 'user',
              timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              )`,
        (err) => {
          if (err) {
            console.log('Table already exist!')
          } else {
            console.log('Table created!')
          }
        });
    }
  } catch (error) {
    console.log(error)
  }

});


module.exports = db

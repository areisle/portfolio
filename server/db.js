const mysql = require('mysql');
const {DBUSER, DBPASS, DBHOST, DB} = process.env;

let connection = mysql.createConnection({
  host: DBHOST,
  user: DBUSER,
  password: DBPASS,
  database: DB
});
try {
  connection.connect();
} catch (error) {
  console.log('db connection error', error);
}

let db = {};
db.getProjectOutlines = () => {
  return new Promise(function (resolve, reject) {
    connection.query('SELECT name, slug, category, tags FROM Projects', function (err, results) {
      if (err) {
        console.log('db error:', err);
      } else {
        resolve(results);
      }
    });
  });
};

db.getProject = (name) => {
  return new Promise(function (resolve, reject) {
    let query = `SELECT * FROM Projects WHERE slug="${name}"`;
    connection.query(query, function (err, results) {
      if (err) {
        console.log('db error:', err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = db;

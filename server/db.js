const mysql = require('mysql');
const {DBUSER, DBPASS, DBHOST, DB} = process.env;

let connection = mysql.createPool({
  connectionLimit: 4,
  host: DBHOST,
  user: DBUSER,
  password: DBPASS,
  database: DB
});

let db = {};
db.getProjectOutlines = () => {
  return new Promise(function (resolve, reject) {
    connection.query('SELECT name, slug, category, tags, background FROM Projects ORDER BY priority', function (error, results) {
      if (error) {
        console.log('db error:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

db.getProject = (name) => {
  return new Promise(function (resolve, reject) {
    let query = `SELECT * FROM Projects WHERE slug="${name}"`;
    connection.query(query, function (error, results) {
      if (error) {
        console.log('db error:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = db;

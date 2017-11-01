const mysql = require('mysql');
const {DBUSER, DBPASS, DBHOST, DB} = process.env;

let connection = mysql.createConnection({
  host: DBHOST,
  user: DBUSER,
  password: DBPASS,
  database: DB
});

connection.connect();
let db = {};
db.getProjectOutlines = () => {
  return new Promise(function (resolve, reject) {
    connection.query('SELECT name, slug, category, tags FROM Projects', function (err, results) {
      resolve(results);
    });
  });
};

db.getProject = (name) => {
  return new Promise(function (resolve, reject) {
    let query = `SELECT * FROM Projects WHERE slug="${name}"`;
    connection.query(query, function (err, results) {
      resolve(results);
    });
  });
};

module.exports = db;

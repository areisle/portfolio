let mysql = require('mysql');
let express = require('express');
let cors = require('cors');
let app = express();

app.use(cors());

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'testdb_portfolio'
})

connection.connect();

app.get('/names/', function(req, res) {
  console.log('requesting names');
  let names = getAllNames();
  names.then(results => res.send(results));
  
});

app.get('/projects/', function(req, res) {
  //returns all project oulines (name, categories, tags etc.)
  console.log('requesting outlines');
  let outlines = getProjectOutlines();
  outlines.then(results => res.send(results));
  
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});

function getProjectOutlines() {
  return new Promise(function (resolve, reject) {
    console.log('getting outlines');
    connection.query('SELECT name, category, tags FROM Projects', function(err, results) {
      resolve(results);
    });
  });
}

function getAllNames() {
  return new Promise(function (resolve, reject) {
    console.log('getting names');
    connection.query('SELECT name FROM Projects', function(err, results) {
      resolve(results);
    });
  });
}
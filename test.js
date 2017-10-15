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
  let names = getAllNames();
  names.then(results => res.send(results));
  
});

app.get('/projects/', function(req, res) {
  //returns all project oulines (name, categories, tags etc.)
  res.set('Content-Type', 'application/json');
  let outlines = getProjectOutlines();
  outlines.then(results => res.send(results));
  
});

app.get('/projects/:projectName', function(req, res) {
  //returns all project oulines (name, categories, tags etc.)
  let project = getProject(req.params.projectName);
  project.then(results => res.send(results));
  
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});

function getProjectOutlines() {
  return new Promise(function (resolve, reject) {
    connection.query('SELECT name, slug, category, tags FROM Projects', function(err, results) {
      resolve(results);
    });
  });
}

function getAllNames() {
  return new Promise(function (resolve, reject) {
    connection.query('SELECT name FROM Projects', function(err, results) {
      resolve(results);
    });
  });
}

function getProject(name) {
  return new Promise(function (resolve, reject) {
    let query = `SELECT * FROM Projects WHERE slug="${name}"`
    connection.query(query, function(err, results) {
      resolve(results);
    });
  });
}
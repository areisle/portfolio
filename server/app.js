const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const {MUSER, MPASS, DBUSER, DBPASS, DBHOST, DB, MTO} = process.env

app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());

let connection = mysql.createConnection({
  host: DBHOST,
  user: DBUSER,
  password: DBPASS,
  database: DB
})

connection.connect();

const getProjectOutlines = () => {
  return new Promise(function (resolve, reject) {
    connection.query('SELECT name, slug, category, tags FROM Projects', function(err, results) {
      resolve(results);
    });
  });
};

const getProject = (name) => {
  return new Promise(function (resolve, reject) {
    let query = `SELECT * FROM Projects WHERE slug="${name}"`
    connection.query(query, function(err, results) {
      resolve(results);
    });
  });
};

app.get('/projects/', function(req, res) {
  //returns all project oulines (name, categories, tags etc.)
  res.set('Content-Type', 'application/json');
  let outlines = getProjectOutlines();
  outlines.then(results => res.send(results));
  
});

app.get('/projects/:projectName', function(req, res) {
  //returns all data for specified project 
  let project = getProject(req.params.projectName);
  project.then(results => res.send(results));
  
});

app.post('/contact/', [
  check('email').isEmail()
                .normalizeEmail(),
  check(['firstname', 'lastname']).isAlpha()
               .isLength({min: 2, max: 300})
               .trim()
               .escape(),
  check(['message', 'subject'])
                  .not().isEmpty()
                  .trim()
                  .escape(),
  check('company').optional()
                  .trim()
                  .escape()
], (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  // data was validated, proceed to format then send email
  const data = matchedData(req);
  let smtpTrans, mailOpts;
  smtpTrans = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: MUSER,
      pass: MPASS
    }
  });
  mailOpts = {
    from: `${data.firstname} ${data.lastname} &lt;${MUSER}&gt;`,
    to: MTO,
    subject: data.subject,
    text: `FROM: ${data.firstname} ${data.lastname} \<${data.email}\> \n ${data.message}`
  };
  smtpTrans.sendMail(mailOpts, function() {
    res.send('success');
  });
});

app.listen(3001, function() {
});

const cleanup = (msg='') => {
   console.log('cleaning up', msg);
   connection.end();
   //app.close(); //fix this later?
   process.exit();
};
process.on('SIGINT', cleanup);
process.on('uncaughtException', cleanup);

module.exports = app;
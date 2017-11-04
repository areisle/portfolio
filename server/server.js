const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const {check, validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');
const {MUSER, MPASS, MTO} = process.env;
// import path from 'path';
const path = require('path');
const db = require('./db.js');
app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());

const router = express.Router();

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

router.get('/projects/', function (req, res) {
  // returns all project oulines (name, categories, tags etc.)
  res.set('Content-Type', 'application/json');
  let outlines = db.getProjectOutlines();
  outlines.then(results => res.send(results))
    .catch(error => console.log('db error: ', error));
});

router.get('/projects/:projectName', function (req, res) {
  // returns all data for specified project
  let project = db.getProject(req.params.projectName);
  project.then(results => res.send(results));
});

router.post('/contact/', [
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
  console.log('console.log request body is:', req.body);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
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
    text: `FROM: ${data.firstname} ${data.lastname} <${data.email}> \n ${data.message}`
  };
  smtpTrans.sendMail(mailOpts, function () {
    res.send('success');
  });
});

app.use(router);
app.use('/*', staticFiles);

app.set('port', (process.env.PORT || 3001));
app.listen(process.env.PORT || 3001, function () {
});

module.exports = app;

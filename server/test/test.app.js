const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../app.js');
chai.use(chaiHttp);

describe('GET', () => {
  describe('/projects/', () => {
    it('gets basic details for all projects', (done) => {
      chai.request(app)
        .get('/projects/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          res.body.forEach(project => {
            expect(project).to.have.all.keys('name', 'slug', 'tags', 'category');
          });
          done();
        });
    });
  });
  describe('/projects/:projectName', () => {
    it('gets details for specified project', (done) => {
      chai.request(app)
        .get('/projects/band')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0]).to.be.an('object');
          done();
        });
    });
    it('has all necessary fields for project');
  });
});
describe('POST', () => {
  describe('/contact/', () => {
    it('receives good data and send email');
    it('responds to bad data')
  });
});
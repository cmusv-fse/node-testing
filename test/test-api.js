let expect = require('chai').expect;
let agent = require('superagent');
var DB = require('../services/dbLite').DBLite;
var DAO = require('../services/dao').DAO;
var Status = require('../models/status').Status;

let PORT = 3000;
let HOST = 'http://localhost:' + PORT;

// Initiate Server
let app = require('../app');

let server = app.listen(PORT);

setup(function () {
  DAO.db = new DB();
});


// Dummy Users
var dummy = { username: 'Arthur', password: 'vwy207', status: Status.HELP };
var goofy = { username: 'Ritvik', password: 'vwy207', status: Status.OK };
var silly = { username: 'access', password: 'xyz124', status: Status.OK };
var folly = { username: 'Jane', password: 'aa', status: Status.OK };


suite('API TESTS: ', function () {

  test('Can post a new user', function (done) {
    agent.post(HOST + '/users')
      .send(dummy)
      .end(function (err, res) {
        expect(err).to.be.equal(null);
        expect(res.statusCode).to.be.equal(201);

        agent.get(HOST + '/users')
          .send()
          .end(function (err, res) {
            expect(err).to.equal(null);
            let users = res.body;
            let arthur = users.find((u) => u.username === dummy.username);
            expect(arthur.username).to.equal(dummy.username);
            done();
          });
      });
  });

  test('Should not be able to post an exsisting user with rigth response code', function (done) {
    agent.post(HOST + '/users')
      .send(goofy)
      .end(function (err, res) {
        expect(err).not.to.equal(null);
        expect(res.statusCode).to.be.equal(422);
        done();
      });
  });

  test('Can get all users', function (done) {
    agent.get(HOST + '/users')
      .send()
      .end(function (err, res) {
        expect(err).to.be.equal(null);
        expect(res.statusCode).to.be.equal(200);
        let users = res.body;
        expect(users).to.deep.include({
          username: 'Anton',
          password: 'abc123',
          status: Status.OK
        });
        expect(users).to.deep.include({
          username: 'Ritvik',
          password: 'def012',
          status: Status.HELP
        });
        done();
      });
  });

  test('Can get users in emergency', function (done) {
    agent.get(HOST + '/users/emergency')
      .send()
      .end(function (err, res) {
        expect(err).to.be.equal(null);
        expect(res.statusCode).to.be.equal(200);
        let users = res.body;
        expect(users).not.to.deep.include({ username: 'Anton', password: 'abc123', status: Status.OK });
        expect(users).to.deep.include({ username: 'Ritvik', password: 'def012', status: Status.HELP });
        done();
      });
  });

  test('Should reject post with invalid username with right response code', function (done) {
    agent.post(HOST + '/users')
      .send(silly)
      .end(function (err, res) {
        expect(err).not.to.equal(null);
        expect(res.statusCode).to.be.equal(406);
        done();
      });
  });

  test('Should reject post with invalid password with right response code', function (done) {
    agent.post(HOST + '/users')
      .send(folly)
      .end(function (err, res) {
        expect(err).not.to.equal(null);
        expect(res.statusCode).to.be.equal(406);
        done();
      });
  });
})

let expect = require('chai').expect;
let agent = require('superagent');
var DB = require('../services/dbLite').DBLite;
var DAO = require('../services/dao').DAO;

let PORT = 3000;
let HOST = 'http://localhost:' + PORT;

// Initiate Server
let app = require('../app');

let server = app.listen(PORT)
DAO.db = new DB();

// Dummy User
let user = {
  username: 'Arthur',
  password: 'password',
  status: "EMERGENCY"
};

suite('API TESTS: ', function () {

  test('Can add a new user', function (done) {
    agent.post(HOST + '/users')
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.equal(null);
        expect(res.statusCode).to.be.equal(201);

        agent.get(HOST + '/users')
          .send()
          .end(function (err, res) {
            expect(err).to.equal(null);

            let users = res.body;
            expect(users).to.be.an('array');

            let arthur = users.find((u) => u.username === user.username);
            expect(arthur).to.not.equal(null);
            done();
          });
      });
  });
});

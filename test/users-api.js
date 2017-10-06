let expect = require('expect.js');
let agent = require('superagent');

let PORT = 3000;
let HOST = 'http://localhost:' + PORT;

let db = require('../services/db')

// Initiate Server
let app = require('../app');
let server = app.listen(PORT)

// Dummy User
let user = {
  username: 'Arthur',
  password: 'password',
  status: "EMERGENCY"
};

suite('Join Community API', function(){
  test('Add a new user', function(done) {
    agent.post(HOST+'/users')
    .send(user)
    .end(function(err, res){
      expect(err).to.be.equal(null);
      expect(res.statusCode).to.be.equal(201);

      agent.get(HOST+'/users')
      .send()
      .end(function(err, res){
        expect(err).to.be.equal(null);

        let users = res.body;
        expect(users).to.be.an('array');

        let arthur = users.find((u) => u.username === user.username);
        expect(arthur).to.not.be.equal(null);
        done();
      });
    });
  });
});

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

// Populate with a dummy value
db.addUser(user)

suite('Join Community API', function(){
  test('Add a new user', function(done) {
    agent.post(HOST+'/users')
    .send(user)
    .end(function(err, res){
      expect(err).not.to.be.ok()
      expect(res).to.have.property('statusCode')
      expect(res.statusCode).to.equal(201)
      done();
    });
  });

  test('Get user list', function(done) {
    agent.get(HOST+'/users')
      .end(function(err, res){
        expect(err).to.not.be.ok();
        expect(res).to.have.property('statusCode');
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).not.to.be.empty()
        done();
      });
  })

  test('Get emergency user', function(done) {
    agent.get(HOST+'/users')
      .end(function(err, res){
        expect(err).to.not.be.ok();
        expect(res).to.have.property('statusCode');
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).not.to.be.empty()
        done();
      });
  })
});

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
      // Assertion Statements here
      done();
    });
  });
});

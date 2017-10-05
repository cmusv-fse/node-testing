let expect = require('expect.js');
let agent = require('superagent');

let PORT = process.env.PORT | 3000;
let HOST = 'http://localhost:'+PORT;

// Initiate Server
let debug = require('debug')('Node-API-Testing');
let app = require('../app');

app.set('port', PORT);
app.set('testing', true);

let serverInitialized = function() {
  debug('Express server listening on port ' + PORT);
};

let server = app.listen(app.get('port'), serverInitialized)
.on('error', function(err){
  if(err.code === 'EADDRINUSE'){
    PORT++;
    HOST = 'http://localhost:'+PORT;
    app.set('port', PORT);
    server = app.listen(app.get('port'), serverInitialized)
  }
});

//////////////////////////////////

let user = {
  name: 'John',
  surname: 'Doe',
  age: 35
};

suite('Users API', function(){

  test('Creating user', function(done){
    agent.post(HOST+'/users')
    .send(user)
    .end(function(err, res){
      expect(err).to.not.be.ok();
      expect(res).to.have.property('statusCode');
      expect(res).to.have.property('body');
      expect(res.statusCode).to.equal(201);
      done();
    });
  });

  test('Deleting all Users', function(done){
    agent.del(HOST+'/users')
    .end(function(err, res){
      expect(err).to.not.be.ok();
      expect(res).to.have.property('statusCode');
      expect(res).to.have.property('body');
      expect(res.statusCode).to.equal(200);

      agent.get(HOST+'/users')
      .end(function(err, res){
        expect(err).to.not.be.ok();
        expect(res).to.have.property('statusCode');
        expect(res).to.have.property('body');
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(0);
        done();
      });
    });
  });

  test('Getting all users when empty', function(done){
    agent.get(HOST+'/users')
    .end(function(err, res){
      expect(err).to.not.be.ok();
      expect(res).to.have.property('statusCode');
      expect(res).to.have.property('body');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(0);
      done();
    });
  });

  suite('After Creating User', function(){

    setup('Create User', function(done){
      agent.post(HOST+'/users')
      .send(user)
      .end(function(){
        done();
      });
    });

    teardown('Delete all Users', function(done){
      agent.del(HOST+'/users')
      .end(function(){
        done();
      });
    });

    test('Getting valid user', function(done){
        agent.get(HOST+'/users/'+user.name)
        .end(function(err, res){
          expect(err).to.not.be.ok();
          expect(res).to.have.property('statusCode');
          expect(res).to.have.property('body');
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    test('Getting invalid user', function(done){
      agent.get(HOST+'/users/dummy')
      .end(function(err, res){
        expect(err).to.be.ok();
        expect(res).to.have.property('statusCode');
        expect(res).to.have.property('body');
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
    });

    test('Getting user format', function(done){
        agent.get(HOST+'/users/'+user.name)
        .end(function(err, res){
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('surname');
          expect(res.body).to.have.property('age');
          expect(res.body.age).to.be.a('number');
          done();
        });
    });


    test('User Data Validity', function(done){
        agent.get(HOST+'/users/'+user.name)
        .end(function(err, res){
          expect(res.body).to.eql(user);
          done();
        });
    });

    test('Deleting user', function(done){
        agent.del(HOST+'/users/'+user.name)
        .end(function(err, res){
          expect(err).to.not.be.ok();
          expect(res).to.have.property('statusCode');
          expect(res).to.have.property('body');
          expect(res.statusCode).to.equal(200);
          // Get all Users
          agent.get(HOST+'/users')
          .end(function(err, res){
            expect(err).to.not.be.ok();
            expect(res).to.have.property('statusCode');
            expect(res).to.have.property('body');
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(0);
            done();
          });
        });
    });
  });




});

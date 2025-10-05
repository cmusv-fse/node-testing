#!/usr/bin/env node

// run with 'npm start'

const debug = require('debug')('Node-API-Testing');
const app = require('./app');
const DB = require('./dataAccess/dbTest').DBTest;
const DAC = require('./dataAccess/dac').DAC;

app.set('port', process.env.PORT || 3000);

DAC.db = new DB();

const server = app.listen(app.get('port'), function () {
  const msg = 'Express server listening on port ' + server.address().port;
  console.log(msg);
  debug(msg);
});

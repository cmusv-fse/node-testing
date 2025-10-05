#!/usr/bin/env node

// run with 'npm start'

import app from './app.js';
import { DBTest as DB } from './dataAccess/dbTest.js';
import { DAC } from './dataAccess/dac.js';

app.set('port', process.env.PORT || 3000);

DAC.db = new DB();

const server = app.listen(app.get('port'), function () {
  const msg = 'Express server listening on port ' + server.address().port;
  console.log(msg);
});

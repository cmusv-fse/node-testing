Testing in JavaScript
=====================

An example on unit testing, integration testing and asynchronous testing in JavaScript using Jest.

After npm install, should be ready to go.

Use a recent node version.

Jest resources
==============

See https://jestjs.io/docs/getting-started

Run the app (localhost:3000)
============================

The app doesn't have a front-end, but you can run it to issue REST requests.

* npm run start

# Run the tests

* Use the npm scripts in package.json
* Run a specific test file: npm run test *path*

Hand-generated tests are in tests/my-tests

* Run all hand-generated tests: npm run test:my
* Run hand-generated unit tests: npm run test:my:unit
* Run hand-generated integration tests: npm run test:my:rest

Copilot-generated (with Sonnet 4) tests are in tests/ai-tests

* Run all Copilot-generated tests: npm run test:ai
* Run Copilot-generated unit tests: npm run test:ai:unit
* Run Copilot-generated integration tests: npm run test:ai:rest

Miscellaneous tests from class and slide examples are  in tests/misc-tests

* Run misc tests: npm run test:misc

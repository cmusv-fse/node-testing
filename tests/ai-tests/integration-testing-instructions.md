*Copilot should igore this: This is an example instructions file for demo purposes: each team should create its own complete instructions file.*

# What are Integration Tests

1. Integration tests hit the server from the REST API.
2. Jest should start a server before all tests run, and close the server when tests are finished.

# Test File Naming Conventions for Integration Tests

1. For each router file myRouter.router.js, the integration tests should be placed in a file /tests/ai-tests/myRouter.rest.test.js

# Access to Persistent Data through DAC

1. Tests should inject a test version of the DB implementation into DAC.
2. Check the dataAccess layer and the DBTest class. If an actual storage-based DB implementation is not yet present, use an instance of the in-memory DB (the DBLite class.)

# Integration Testing PrinciplesState Updating Tests

State updating endpoints (POST, UPDATE, DELETE, PATCH) should always check the targeted resources have been updated. This can be done in two ways:

1. Issue a subsequent GET request to retrieve the targeted resource and check the result.
2. From the corresponding model, access the updated resource and check its state.

## Order Independence

1. The DB must be re-initialized after each test so that the order in which the tests don't matter.

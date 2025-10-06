*Copilot should igore this: This is an example instructions file for demo purposes: each team should create its own complete instructions file.*

# Test File Naming Conventions for Unit Tests

1. For each model file entity.model.js, the unit tests should be placed in a file /tests/ai-tests/entity.model.test.js

# Access to Persistent Data through DAC

1. Tests should inject a test version of the DB implementation into DAC.
2. Check the dataAccess layer and the DBTest class. If an actual storage-based DB implementation is not yet present, use an instance of the in-memory DB (the DBLite class.)

# Follow Unit Testing Principles

## No Trivially Passing Tests

1. There should be no empty tests.
2. If a test is not yet ready or if it represents a to-do, it should contain a fail statement with an error message "Test is not ready!"
3. No test should be impossible to fail.

## Negative Tests Should Use the Correct Pattern

1. Negative tests are tests that should pass when the production code fails or fail when the production code succeeds.
2. If the tested production code should throw an error, the test should expect the error to be thrown and verify that the error is the right error.
3. If the tested production code should throw an error, but it does not, then the test should fail with an error that indicates this situation and should never pass.
4. Example negative test patter that uses `try-catch`:
   ```
   test('Should not create user with invalid password', () => {
     try {
       var newUser = new User('Wang', '123', Status.OK);
       throw new Error("erroneously valid password");
     } catch (err) {
       expect(err.message || err).toBe("invalid password");
     }
   });
   ```

## Order Independence

1. The DB must be re-initialized after each test so that the order in which the tests don't matter.

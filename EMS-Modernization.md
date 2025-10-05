# ESM Modernization

This file is used by Copilot to modernize the module structure of the project by substituting ES built-in module system for the common.js module system.

## Step A: Modernize Dependencies

1. Update all dependencies to their latest version.
2. Get rid of all deprecated dependencies.
3. Get rid of all vulnerabilities with npm audit.
4. Check that the server can be started.
5. Run the available tests.
6. Stop here before proceeding to Step B and ask for confirmation.

## Step B: Migrate to ESM

1. Don't use any experimental vm features when running the tests.
2. Update the Jest configuration accordingly.
3. Keep it simple: preserve the ".js" extension.
4. Migrate the "dac.js" file first. And migrate the Jest file "dac.test.js". Then test the migration by running the "dac.test.js" test file.
5. If step 4 is successful, migrate the rest of the application and the tests.
6. If step 5 is unsuccessful, try the experimental vm modules option with jest. Stop to ask for confirmation first before proceeding.
7. If step 6 is successful, modify all npm scripts to use the experimental vm modules with jest.

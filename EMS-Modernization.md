# EMS Modernization

Modernize the module structure of the project by substituting ES built-in module system for the common.js module system. 

## Step A: Modernize Dependencies

1. Update all dependencies to their latest version.
2. Get rid of all deprecated dependencies.
3. Get rid of all vulnerabilities with npm audit.
4. Check that the server can be started.
5. Run the available tests.

## Step B: Migrate to EMS

1. Don't use any eperimental vm features when running the tests.
2. Update the Jest configuration accordingly.
3. Keep it simple: preserve the ".js" extension.
4. Migrate the "dac.js"" file first. And and migrate the Jest file "dac.test.js". Then test the migration by running the "dac.test.js" test file.
5. If step 4 is successfull, migrate the rest of the application and the tests.

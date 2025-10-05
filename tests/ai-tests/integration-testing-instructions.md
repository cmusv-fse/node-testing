# Integration Testing Principles

## State Updating Tests

State updating endpoints (POST, UPDATE, DELETE, PATCH) should always check the targeted resources have been updated. This can be done in two ways:

1. Issue a subsequent GET request to retrieve the targeted resource and check the result.
2. From the corresponding model, access the updated resource and check its state.

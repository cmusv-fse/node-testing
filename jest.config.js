// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
  clearMocks: true,
  testEnvironment: 'node',
  transform: {},
  coverageDirectory: "coverage",
  testMatch: [
    "**/tests/**/*.js",
  ],
  globals: {
    'jest': {
      useESM: true
    }
  }
};

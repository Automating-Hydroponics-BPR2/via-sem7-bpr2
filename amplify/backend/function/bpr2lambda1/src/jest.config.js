// Define your Jest configuration object
const jestConfig = {
  testEnvironment: 'node',
  testMatch: ['**/__test__/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  modulePathIgnorePatterns: ['/node_modules/'],
  collectCoverage: false,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};

// Define your Jest configuration object
export default jestConfig;
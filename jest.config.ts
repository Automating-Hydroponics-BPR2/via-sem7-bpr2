module.exports = {
  testEnvironment: 'jsdom',

  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(test).+(ts|tsx|js)'],

  transform: {
    '\\.[jt]sx?$': 'babel-jest',

    '^.+\\.(js|jsx)$': 'jest-esm-transformer',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  transformIgnorePatterns: [`/node_modules/*`],

  moduleDirectories: ['node_modules', 'src'],

  moduleNameMapper: { '^uuid$': 'uuid' },
};

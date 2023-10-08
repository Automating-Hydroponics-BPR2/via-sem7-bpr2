module.exports = {
  testEnvironment: 'jsdom',

  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(test).+(ts|tsx|js)'],

  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/', '/.vscode/', '/.github/', '/.git/', '/amplify/\#current-cloud-backend'],

  transform: {
    '\\.[jt]sx?$': 'babel-jest',

    '^.+\\.(js|jsx)$': 'jest-esm-transformer',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  transformIgnorePatterns: [`/node_modules/*`, '/coverage/', '/dist/', '/.vscode/', '/.github/', '/.git/', '/amplify/\#current-cloud-backend'],

  moduleDirectories: ['node_modules', 'src'],

  moduleNameMapper: { '^uuid$': 'uuid' },
};

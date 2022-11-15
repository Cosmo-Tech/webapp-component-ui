// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

module.exports = {
  testMatch: ['**/src/**/*.test.js'],
  moduleNameMapper: {
    '\\.(css|scss|less)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/jestSetup.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  coveragePathIgnorePatterns: ['node_modules', 'tests'],
  coverageReporters: ['lcov', 'text-summary'],
};

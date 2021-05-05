// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

module.exports = {
  verbose: true,
  moduleDirectories: [
    '<rootDir>',
    '.',
    'node_modules',
    'src'
  ],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  }
};

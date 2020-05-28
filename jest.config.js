const { defaults } = require('jest-config');

module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'svg'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
    '^components(.*)$': '<rootDir>/components$1',
    '^pages(.*)$': '<rootDir>/pages$1',
    '^redux(.*)$': '<rootDir>/redux$1',
    '^utils(.*)$': '<rootDir>/utils$1',
    '^jest-factories(.*)$': `<rootDir>/jest/factories$1`,
    '^jest-utils(.*)$': '<rootDir>/jest/utils$1',
    '^actions(.*)$': '<rootDir>/redux/actions$1',
    '^models(.*)$': '<rootDir>/redux/models$1',
    '^reducers(.*)$': '<rootDir>/redux/reducers$1',
    '^sagas(.*)$': '<rootDir>/redux/sagas$1',
    '^api(.*)$': '<rootDir>/redux/sagas/api$1',
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    'pages/**/*.{js,jsx}',
    'redux/**/*.{js,jsx}',
    '!pages/_app.js',
    '!pages/examples/*.{js,jsx}',
    '!redux/configureStore.js',
    '!**/index.js',
  ],
};

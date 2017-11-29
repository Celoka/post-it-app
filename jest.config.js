module.exports = {
  setupFiles: [
    '<rootDir>/mock/LocalStorage',
    '<rootDir>/mock/jqueryMock'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/test/'
  ],
  coveragePathIgnorePatterns: [
    'localStorage'
  ],
  collectCoverage: true
};

module.exports = {
  setupFiles: [
    '<rootDir>/mock/localStorage'
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

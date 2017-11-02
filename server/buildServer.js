// describes a file to serve the server
// for heroku to build and launch app without crashing
require('babel-polyfill');
require('babel-register');
require('./server');

const firebase = require('firebase');
const dotenv = require('dotenv');

dotenv.config();
const config = {
  apiKey: 'AIzaSyAejYE9GO5kC-DIwE1sJBbFfE1mT5kR_-M',
  authDomain: 'post-it-6c005.firebaseapp.com',
  databaseURL: 'https://post-it-6c005.firebaseio.com',
  projectId: 'post-it-6c005',
  storageBucket: 'post-it-6c005.appspot.com',
  messagingSenderId: '13317391785'
};
const db = firebase.initializeApp(config);
module.exports = db;

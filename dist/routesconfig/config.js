const firebase = require('firebase');
// const dotenv = require('dotenv');

// dotenv.config();
const config = {
  apiKey: 'AIzaSyD0-vDDGz3053Lq2cerjyVySKtgRU1A7Rc',
  authDomain: 'eloka-667be.firebaseapp.com',
  databaseURL: 'https://eloka-667be.firebaseio.com',
  projectId: 'eloka-667be',
  storageBucket: 'eloka-667be.appspot.com',
  messagingSenderId: '333745271095'
};
const db = firebase.initializeApp(config);
module.exports = db;

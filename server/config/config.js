import firebase from 'firebase';

// import serviceAccount from '../../serviceAccountKey.json';

const config = {
  apiKey: 'AIzaSyD0-vDDGz3053Lq2cerjyVySKtgRU1A7Rc',
  authDomain: 'eloka-667be.firebaseapp.com',
  databaseURL: 'https://eloka-667be.firebaseio.com',
  projectId: 'eloka-667be',
  storageBucket: 'eloka-667be.appspot.com',
  messagingSenderId: '333745271095'
};

const db = firebase.initializeApp(config);
// export const firebaseAuth = firebase.auth;
// export const ref = firebase.database().ref();

export default db;

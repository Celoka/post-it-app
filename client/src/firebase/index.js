import firebase from 'firebase';


const config = {
  apiKey: 'AIzaSyD0-vDDGz3053Lq2cerjyVySKtgRU1A7Rc',
  authDomain: 'eloka-667be.firebaseapp.com',
  databaseURL: 'https://eloka-667be.firebaseio.com',
  projectId: 'eloka-667be',
  storageBucket: 'eloka-667be.appspot.com',
  messagingSenderId: '333745271095'
};

firebase.initializeApp(config);

export default firebase;

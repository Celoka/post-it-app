import firebase from 'firebase';
// import admin from 'firebase-admin';
import dotenv from 'dotenv';

// import serviceAccount from '../../serviceAccountKey.json';

dotenv.config();

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};
const db = firebase.initializeApp(config);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://eloka-667be.firebaseio.com'
// });

// db.auth().onAuthStateChanged((user) => {
//   console.log(JSON.stringify(user));
// });

export default db;

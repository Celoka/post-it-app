const express = require('express'),
  firebase = require('firebase'),
  apiRouter = express.Router();

const config = {
  apiKey: 'AIzaSyAxE27GJgpO5FCHhp6iTOu_s0UWTgkopVI',
  authDomain: 'post-it-aa825.firebaseapp.com',
  databaseURL: 'https://post-it-aa825.firebaseio.com',
  projectId: 'post-it-aa825',
  storageBucket: 'post-it-aa825.appspot.com',
  messagingSenderId: '310778448957'
};
firebase.initializeApp(config);
const myDataBase = firebase.database();
const userRef = myDataBase.ref('user');

// apiRouter.use((req, res, next) => {
//   console.log('Welcome to Post it!');
//   next();
// });

apiRouter.post('/user/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      userRef.push({
        userEmail: email,
        userPassword: password,
        userName: username
      });
      res.send({
        message: 'Successfully created!'
      });
    })
    .catch((error) => {
      res.send({
        message: error.message
      });
    });
});
// -----------------------------------------Signin Route---------
// apiRouter.post('/user/signin', (req, res) => {
//   const password = req.body.password;
//   const email = req.body.email;
//   firebase.auth().signInWithEmailAndPassword(email, password)

//     .then(() => {
//       userRef.push({
//         userEmail: email,
//         userPassword: password
//       });
//       res.send({
//         message: 'User Signed in!'
//       });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       if (errorCode === 'auth/wrong password') {
//         res.send('Wrong password or email');
//       } else {
//         res.send(errorMessage);
//       }
//     });
// });
// // ------------------------------------------------Group Route---------
// apiRouter.post('/group', (req, res) => {
//   const username = req.body.username;
//   const groupname = req.body.groupname;

//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       firebase.database.ref('Group').child(groupname).push({
//         userName: username,
//         userGroup: groupname,
//       });
//       res.send({
//         message: 'User group created'
//       });
//     } else {
//     // No user is signed in.
//       res.send({
//         message: 'No user signed in'
//       });
//     }
//   });
// });

// // apiRouter.post('/group/groupid/user', (req, res) => {

// //   const groupname = req.body.name;
// //   const groupid = req.body.name;
// //   const groupcreator = req.body.name;
// // })
module.exports = apiRouter;

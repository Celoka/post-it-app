const express = require('express'),
      firebase = require('firebase'),
      router = express.Router();

const config = {
  apiKey: 'AIzaSyAxE27GJgpO5FCHhp6iTOu_s0UWTgkopVI',
  authDomain: 'post-it-aa825.firebaseapp.com',
  databaseURL: 'https://post-it-aa825.firebaseio.com',
  projectId: 'post-it-aa825',
  storageBucket: 'post-it-aa825.appspot.com',
  messagingSenderId: '310778448957'
};
firebase.initializeApp(config);
const db = firebase.database();
const userRef = db.ref('user');

router.post('/user/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    userRef.push({
      userEmail: email,
      userPassword: password,
      userName: username
    });
    res.send({
      message: 'Successfully created!'
    });
  }).catch(error => {
    res.send({
      message: error.message
    });
  });
});
// -----------------------------------------Signin Route---------
router.post('/user/signin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    res.send({
      message: 'User Signed in!'
    });
  }).catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/wrong password') {
      res.send('Wrong password or email');
    } else {
      res.send({
        message: `Enter valid email and password ${errorMessage}`
      });
    }
  });
});
// ------------------------------------------------Group Route---------
router.post('/group', (req, res) => {
  const groupName = req.body.groupname;
  // checking if user is signed in
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const userId = user.uid;
      db.ref().child('group').push({
        groupname: groupName,
        groupOwner: userId
      });
      res.send({
        message: 'Group created successfully'
      });
    } else {
      res.send({
        message: 'Not signed in..'
      });
    }
  });
});
// ----------addUserToGroup-----------
router.post('/group/:groupId/user', (req, res) => {
  const groupKey = req.params.groupId;
  firebase.database().ref(`Groups/${groupKey}/groupMembers/`).push({ user: req.body.memberId });
  res.send('user added');
});
module.exports = router;
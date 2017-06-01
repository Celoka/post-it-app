import express from 'express';
import firebase from 'firebase';
import db from './config';

const routes = express.Router();

// ------------------Signup Route-----------------------------------
routes.route('/user/signup')
.post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    db.database().ref('users').push({
      userEmail: email,
      userPassword: password,
      userName: username
    });
    res.send({
      message: 'User account created successfully'
    });
  })
  .catch(() => {
    res.status(404).send({
      message: 'User already registered'
    });
  });


// -----------------------Signin Route-------------------------------
  routes.route('/user/signin')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      res.send({
        message: 'User Signed in!'
      });
    })
    .catch((error) => {
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
// ------------------------Group Route----------------------------------
  routes.post('/group', (req, res) => {
    const groupName = req.body.groupname;
// checking if user is signed in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        db.ref().child('group').push({
          groupname: groupName,
          groupOwner: userId,
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
// -----------------------------addUserToGroup-----------------------------
  routes.post('/group/:groupId/user', (req, res) => {
    const groupKey = req.params.groupId;
    firebase.database().ref(`Groups/${groupKey}/groupMembers/`)
  .push({ user: req.body.member });
    res.send('user added');
  });
});

export default routes;

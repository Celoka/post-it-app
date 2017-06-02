const express = require('express'),
  firebase = require('firebase'),
  routes = express.Router();
  
const db = require('./config');


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
});
// -----------------------Signin Route-------------------------------
routes.route('/user/signin')
    .post((req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          res.send({
            message: 'User Signed in!'
          });
        })
        .catch(() => {
          res.status(404).send({
            message: 'Wrong password or email'
          });
        });
    });
// ----------------------Sign out route------------------------------
routes.route('/user/signout')
  .post((req, res) => {
    firebase.auth().signOut()
      .then(() => {
        res.send({
          message: 'Signed out!'
        });
      })
      .catch(() => {
        res.status(404).send({
          message: 'Network Error'
        });
      });
  });
// ------------------------Group Route----------------------------------
routes.route('/group')
.post((req, res) => {
  const groupName = req.body.groupname;
// checking if user is signed in
  firebase.auth().onAuthStateChanged(() => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    if (user !== null) {
      db.database().ref(`Group/${uid}`).child('group').push({
        groupname: groupName,
        groupOwner: uid,
      });
      res.send({
        message: 'Group created successfully'
      });
    } else {
      res.status(404).send({
        message: 'Not signed in..'
      });
    }
  });
});
// -----------------------------addUserToGroup----------------------

routes.route('/group/groupId/user')
.post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const groupname = req.body.group;
  const groupMember = req.body.user;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const groupName = groupname.toLowerCase();
      db.database().ref(`Group/${uid}`).child(groupName).push({
        member: groupMember
      });
      res.send({
        message: 'Member added'
      });
    })
    .catch(() => {
      res.status(401).send({
        message: 'Invalid command'
      });
    });
});

module.exports = routes;

const express = require('express'),
  firebase = require('firebase'),
  routes = express.Router();

// ---------Import firebase config key------
const db = require('./config');


// ------------------Route for Signup------------------------
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
    res.status(200).send({
      message: 'User account created successfully'
    });
  })
  .catch(() => {
    res.status(400).send({
      message: 'User already registered'
    });
  });
});
// -------------Route for Signin--------------------------
routes.route('/user/signin')
    .post((req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          res.send({
            message: 'User Signed in!',
            user
          });
        })
        .catch(() => {
          res.status(404).send({
            message: 'Wrong password or email'
          });
        });
    });
// --------------Route for Sign out--------------------------
routes.route('/user/signout')
  .post((req, res) => {
    firebase.auth().signOut()
      .then(() => {
        res.send({
          message: 'Signed out!'
        });
      })
      .catch(() => {
        res.status(400).send({
          message: 'Network Error'
        });
      });
  });
// -----------------Route for Create Group----------------------
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
// ----------------Route for addMemeberToGroup---------------------

routes.route('/group/groupId/user')
.post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const groupName = req.body.group;
  const groupMember = req.body.user;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const user = (firebase.auth().currentUser).uid;
      db.database().ref(`Group/${user}`).child(groupName).push({
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
// ------------Route for message---------------------
routes.route('/groupName/message')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const groupName = req.body.group;
    const message = req.body.message;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        const userId = (firebase.auth().currentUser).uid;
        const groupRef = db.database().ref(`Group/${userId}`).child(groupName);
        groupRef.orderByKey().on('child_added', (data) => {
          groupRef.child(data.key).push({
            memberMessage: message
          });
        });
        res.send({
          message: 'Message sent'
        });
      })
            .catch(() => {
              res.status(401).send({
                message: 'User not a member'
              });
            });
  });

module.exports = routes;

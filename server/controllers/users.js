import firebase from 'firebase';

const db = require('../config/config');

export const createUser = (req, res) => {
  const email = req.body.email,
    password = req.body.password,
    username = req.body.username,
    phoneNumber = req.body.phoneNumber;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    user.updateProfile({
      displayName: username
    });
    db.database().ref('users/')
    .child(user.uid).set({
      username,
      email,
      phoneNumber
    });
    res.status(200).send({ message: `User account created successfully,
     ${user.displayName}`,
      userDetails: user.providerData });
  })
  .catch((error) => {
    res.status(500).send({ message: error.message });
  });
};

export const logIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        res.send({
          message: 'User Signed in!',
          userDetails: user.providerData
        });
      })
      .catch(() => {
        res.status(401).send({
          message: 'Wrong password or email'
        });
      });
};

export const logOut = (req, res) => {
  firebase.auth().signOut()
    .then((user) => {
      res.send({
        message: 'Signed out!',
        user
      });
    })
    .catch(() => {
      res.status(500).send({
        message: 'Network Error'
      });
    });
};

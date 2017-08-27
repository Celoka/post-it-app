import firebase from 'firebase';

const db = require('../config/config');

export const createGroup = (res, req) => {
  const groupName = req.body.groupName,
    createdBy = req.body.createdBy;
  const groupKey = firebase.database().ref('groups/').push({
    groupName,
    createdBy,
  }).key;
  const groupRef = db.database().ref(`groups/${groupKey}/users`);
  groupRef.set({
    userId,
  });
  const userRef = db.database().ref(`users/${user.uid}/groups/`);
  userRef.child(groupKey).set({
    groupName
  }).then(() => {
    res.status(200).send({
      message: 'Group created!',
    });
  })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
};

export const addUser = (res, req) => {
  const groupId = req.body.groupId,
    currentUser = firebase.auth().currentUser,
    userId = req.body.userId;

  if (currentUser) {
    firebase.database()
        .ref(`group/${groupId}/users`)
        .update({
          id: userId,

        });
    db.ref(`/users/${userId}/groups`).push(
      {
        groupId,
        userId,
        isAdmin: false
      });
    firebase.database().then(() => {
      res.status(200);
      res.send('New user added ');
    });
    firebase.database().catch((error) => {
      res.status(400);
      res.send(error.message);
    });
  } else {
    res.status(401);
    res.send('You need to be signed In');
  }
};

export const sendMessage = (res, req) => {
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
};

/**
 * Module dependencies
 */
import firebase from 'firebase';
import db from '../config/config';
import Utils from '../utils/index';

/**
 * @description create user group controller
 * @param {*} req
 * @param {*} res
 */
export const createGroup = (req, res) => {
  const groupname = req.body.groupname;
  const userId = req.user.uid;
  const timestamp = new Date().toString();

  const groupKey = db.database().ref('/groups').push({
    groupname,
    datecreated: timestamp
  }).key;

  const groupRef = db.database().ref(`/groups/${groupKey}/users`);
  groupRef.set({
    isAdmin: true
  });

  const userRef = db.database().ref(`/users/${userId}/groups`);
  userRef.child(groupKey).set({
    groupname,
    isAdmin: true
  }).then(() => {
    res.status(200).send({
      message: 'User group created successfully',
      groupname,
      datecreated: timestamp,
      groupKey
    });
  })
    .catch((error) => {
      if (!userId) {
        res.status(403).json({
          message: 'Unauthorized operation,please signup/signin',
        });
      } else {
        res.status(500).json({
          message: error,
        });
      }
    });
};

/**
 * @description Add member controller
 * @param {*} req
 * @param {*} res
 */
export const addUser = (req, res) => {
  const groupId = req.params.groupId;
  const newUser = req.body.newUser;
  const user = req.user.uid;

  if (user) {
    const groupRef = db.database().ref(`/groups/${groupId}/users`);
    groupRef.child(newUser).set({
      userId: newUser,
    });

    const userRef = db.database().ref(`/users/${user}/groups`);
    userRef.child(groupId).update({
      userId: newUser,
    })
        .then(() => {
          res.status(200).json({
            message: 'New user added successfully' });
        })
        .catch((error) => {
          res.status(500).json({
            message: error.message });
        });
  } else {
    res.status(403).send({
      message: 'Unauthorized operation,please signup/signin' });
  }
};

/**
 * @description post message controller
 * @param {*} req
 * @param {*} res
 */
export const postMessage = (req, res) => {
  const { message, priority } = req.body;
  const groupId = req.params.groupId;
  const user = req.user.uid;
  const timestamp = new Date().toString();

  if (user) {
    const messageKey = db.database().ref('messages/').push({
    }).key;
    const messageRef = db.database().ref(`messages/${messageKey}/groups/${groupId}`);
    messageRef.push({
      message,
      priority,
      timestamp
    });
    const groupRef = firebase.database().ref(`groups/${groupId}/messages`);
    groupRef.push({
      user,
      message,
      priority,
      timestamp,
    })
    .then(() => {
      res.status(200).json({
        status: 'Message posted successfully',
        message,
        priority,
        timestamp,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message });
    });
  } else {
    res.status(403).json({
      message: 'Unauthorized operation,please signup/signin' });
  }
};

export const getGroup = (req, res) => {
  const user = req.user.uid;
  if (user) {
    const query = db.database().ref(`/users/${user}/groups`).orderByKey();
    query.once('value', (snapshot) => {
      const childData = snapshot.val();
      const userGroups = Utils.normalizeData(childData);
      return res.status(200).json({
        status: 'Message retrieved successfully',
        userGroups });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message
      });
    });
  } else {
    res.status(403).json({
      message: 'Unauthorized operation, please signup/signin'
    });
  }
};

export const getGroupMessage = (req, res) => {
  const groupId = req.params.groupId;
  const groupMessage = [];
  const users = [];
  const messageRef = db.database().ref(`/groups/${groupId}/messages`);
  messageRef.once('value', (snap) => {
    let message = {};
    snap.forEach((data) => {
      message = {
        messageId: data.key,
        text: data.val().message,
        time: data.val().timestamp,
        messagePriority: data.val().priority,
        user: data.val().user
      };
      groupMessage.push(message);
    });
    const userRef = db.database().ref(`/groups/${groupId}/users`);
    userRef.once('value', (userSnapshot) => {
      let user = {};
      userSnapshot.forEach((data) => {
        user = {
          userName: data.val()
        };
        users.push(user);
      });
      res.status(200).json({
        status: 'Message retrived succcessfully',
        groupMessage,
        users
      });
    });
  });
};

/**
 * Module dependencies
 */
import firebase from 'firebase';
import db from '../config/config';
import Utils from '../utils/index';

/**
 * @description Creates user group
 * POST: /group
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} Group object;
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
    res.status(201).send({
      message: 'User group created successfully',
      groupname,
      datecreated: timestamp,
      groupKey
    });
  })
    .catch((error) => {
      if (!userId) {
        res.status(401).json({
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
 * @description Adds a member to a group
 * POST:/group/:groupId/user
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} response object for an added user
 */
export const addMember = (req, res) => {
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
          message: 'New user added successfully'
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message
        });
      });
  } else {
    res.status(401).send({
      message: 'Unauthorized operation,please signup/signin'
    });
  }
};
/**
 * @description Post message to a group
 * POST:/groups/:groupId/message
 *
 * @param {object} req request object
 * @param {object} res response
 *
 * @return { object } response object
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
          message: error.message
        });
      });
  } else {
    res.status(401).json({
      message: 'Unauthorized operation,please signup/signin'
    });
  }
};

/**
 * @description Get user group
 * POST:/groups
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return { object } response object user groups
 */
export const getGroup = (req, res) => {
  const user = req.user.uid;
  if (user) {
    const userRef = db.database().ref(`/users/${user}/groups`).orderByKey();
    userRef.once('value', (snapshot) => {
      const childData = snapshot.val();
      const userGroups = Utils.normalizeData(childData);
      return res.status(200).json({
        status: 'Message retrieved successfully',
        userGroups
      });
    })
      .catch((error) => {
        res.status(500).json({
          message: error.message
        });
      });
  } else {
    res.status(401).json({
      message: 'Unauthorized operation, please signup/signin'
    });
  }
};

/**
 * @description Get group messages
 * POST:/group/:groupId
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} response object message
 */
export const getGroupMessage = (req, res) => {
  const groupId = req.params.groupId;
  const groupMessage = [];
  const messageRef = db.database().ref(`/groups/${groupId}/messages`);
  messageRef.once('value', (snap) => {
    let message = {};
    snap.forEach((details) => {
      message = {
        messageId: details.key,
        text: details.val().message,
        time: details.val().timestamp,
        messagePriority: details.val().priority,
        user: details.val().user
      };
      groupMessage.push(message);
    });
    res.status(200).json({
      status: 'Message retrived succcessfully',
      groupMessage,
    });
  });
};

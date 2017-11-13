/**
 * Module dependencies
 */
import moment from 'moment';
import db from '../config/config';
import {
sendEmailNotifications,
sendSMSNotifications,
normalizeString } from '../helpers/Validate';

require('dotenv').config();
/**
 * @description This controller creates a user group
 * POST: /group
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing group details;
 */
export const createGroup = (req, res) => {
  const { group, userId, displayName } = req.body;
  const timeStamp = new Date().toString();
  const groupName = normalizeString(group);
  db.database().ref(`/users/${userId}/groups`)
  .once('value', (snapShot) => {
    const groupNames = [];
    snapShot.forEach((details) => {
      groupNames.push(details.val().groupName);
    });
    if (groupNames.indexOf(groupName) > -1) {
      res.status(409).json({ message: 'Groupname already exists' });
    } else {
      const groupKey = db.database().ref('/groups').push({
        groupName,
        dateCreated: timeStamp
      }).key;
      db.database().ref(`/groups/${groupKey}/users`)
      .push({
        displayName
      });
      db.database().ref(`/users/${userId}/groups`)
      .child(groupKey).set({
        groupName,
        displayName
      })
      .then(() => {
        res.status(201).send({
          message: 'User group created successfully',
          groupName,
          dateCreated: timeStamp,
          groupId: groupKey
        });
      })
      .catch((error) => {
        if (!userId) {
          res.status(401).json({
            message: 'Login to perform this operation'
          });
        } else {
          res.status(500).json({
            message: `An error occured ${error.message}`
          });
        }
      });
    }
  });
};

/**
 * @description This controller adds a member to a group
 * POST:/group/groupId/user
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containg an added user details
 */
export const addMemberToGroup = (req, res) => {
  const { groupId, userId, newUser: displayName } = req.body;
  db.database().ref(`groups/${groupId}/users/`)
  .push({
    displayName
  });
  db.database().ref(`/users/${userId}`)
  .once('value', (snapshot) => {
    if (snapshot.exists()) {
      const { email, phoneNumber } = snapshot.val();
      db.database().ref(`groups/${groupId}`)
      .once('value', (snap) => {
        const groupName = snap.val().groupName;
        db.database().ref(`/users/${userId}/groups/${groupId}`)
        .update({
          displayName,
          groupName
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: `An error occure ${error.message}`
        });
      });
      db.database().ref(`groups/${groupId}/groupName`)
      .once('value', (groupSnapshot) => {
        if (groupSnapshot.exists()) {
          db.database().ref(`groups/${groupId}/email`)
          .push(email);
          db.database().ref(`groups/${groupId}/phoneNumber`)
          .push(phoneNumber);
        } else {
          res.status(403).json({
            message: 'Group does not exists'
          });
        }
      })
      .then(() => {
        res.status(201).json({
          message: 'User added successfully',
          userId,
          displayName
        });
      });
    } else {
      res.status(404).json({
        message: 'User details not found'
      });
    }
  })
    .catch((error) => {
      res.status(500).json({
        message: `An error occured ${error.message}`
      });
    });
};
/**
 * @description This controller posts message to a group
 * POST:/groups/:groupId/message
 *
 * @param {object} req request object
 * @param {object} res response
 *
 * @return { object } return an object message details
 */
export const postMessage = (req, res) => {
  const { message, priority, displayName } = req.body;
  const { groupId, groupName } = req.params;
  const timeStamp = moment().format('LLLL');
  const messageKey = db.database().ref('messages/')
  .push({})
  .key;
  const messageRef = db.database()
  .ref(`messages/${messageKey}/groups/${groupId}`);
  messageRef.push({
    message,
    priority,
    timeStamp,
    displayName
  });
  const groupRef = db.database().ref(`groups/${groupId}/messages`);
  groupRef.push({
    message,
    priority,
    timeStamp,
    displayName,
  })
  .then(() => {
    res.status(201).json({
      status: 'Message posted successfully',
      message,
      priority,
      timeStamp,
      displayName,
      groupName
    });
  })
  .catch((error) => {
    res.status(500).json({
      message: `An error occured ${error.message}`
    });
  });
  sendEmailNotifications(groupId, priority, groupName);
  sendSMSNotifications(groupId, priority, groupName);
};

/**
 * @description This controller fetches a user group
 * GET:/groups
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return { object } return an object containing user groups
 */
export const getUserGroup = (req, res) => {
  const userId = req.params.userId;
  const userGroups = [];
  db.database().ref(`/users/${userId}/groups`)
  .once('value', (snapShot) => {
    let groupDetail = {};
    snapShot.forEach((details) => {
      groupDetail = {
        groupId: details.key,
        displayName: details.val().displayName,
        groupName: details.val().groupName
      };
      userGroups.push(groupDetail);
    });
    res.status(200).json({
      status: 'User groups retrived succcessfully',
      userGroups
    });
  })
  .catch((error) => {
    res.status(500).json({
      message: error.message
    });
  });
};

/**
 * @description This controller fetches a particular group messages
 * GET:/group/:groupId
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing a particular group message
 */
export const getGroupMessage = (req, res) => {
  const groupId = req.params.groupId;
  const groupMessage = [];
  db.database().ref(`/groups/${groupId}/messages`)
  .once('value', (snap) => {
    let message = {};
    snap.forEach((details) => {
      message = {
        messageId: details.key,
        message: details.val().message,
        timeStamp: details.val().timeStamp,
        priority: details.val().priority,
        user: details.val().user,
        displayName: details.val().displayName
      };
      groupMessage.push(message);
    });
    res.status(200).json({
      status: 'Message retrived succcessfully',
      groupMessage,
    });
  })
  .catch((error) => {
    res.status(500).json({
      message: `An error occured ${error.message}`
    });
  });
};

/**
 * @description This controller fetches a users in a particular group
 * GET:/group/:groupId/users
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing user and userId
 */
export const getUserInGroup = (req, res) => {
  const groupId = req.params.groupId;
  const users = [];
  db.database().ref(`/groups/${groupId}/users`)
  .once('value', (snap) => {
    let usersInGroup = {};
    snap.forEach((details) => {
      usersInGroup = {
        userName: details.val().displayName,
        userId: details.val().userId
      };
      users.push(usersInGroup);
    });
    res.status(200).json({
      message: 'User retrieved successfully',
      users
    });
  })
  .catch((error) => {
    res.status(500).json({
      message: `An error occured ${error.message}`
    });
  });
};

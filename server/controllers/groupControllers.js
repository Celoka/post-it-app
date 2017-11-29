/**
 * Module dependencies
 */
import moment from 'moment';

import configuration from '../config/configuration';
import {
  sendEmailNotifications,
  sendSMSNotifications,
  normalizeString,
  userValidation,
  setGroupDetails,
  serverError
} from '../helpers/serverHelpers';

require('dotenv').config();
/**
 * @description This controller creates a user group
 * POST: /api/v1/group
 *
 * @param { object } req request object
 * @param { object } res response object
 *
 * @return { object } return an object containing group details;
 */
export const createGroup = (req, res) => {
  const { group, userId, displayName } = req.body;
  const timeStamp = new Date().toString();
  const groupName = normalizeString(group);

  configuration.database().ref(`/users/${userId}/groups`)
    .once('value', (snapShot) => {
      const groupNames = [];
      snapShot.forEach((details) => {
        groupNames.push(details.val().groupName);
      });

      if (groupNames.indexOf(groupName) > -1) {
        res.status(409).json({ message: 'Groupname already exists' });
      } else {
        setGroupDetails(req, res, groupName, timeStamp, displayName, userId);
      }
    })
    .catch(() => {
      serverError(res);
    });
};

/**
 * @description This controller adds a member to a group
 * POST:/api/v1/group/groupId/user
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containg an added user details
 */
export const addMemberToGroup = (req, res) => {
  const { groupId, userId, newUser } = req.body;
  const displayName = normalizeString(newUser);

  configuration.database().ref(`groups/${groupId}/users`)
    .once('value', (snapShot) => {
      const names = [];
      snapShot.forEach((details) => {
        names.push(details.val().displayName);
      });

      if (names.indexOf(displayName) > -1) {
        res.status(409).json({ message: 'User is already in group' });
      } else {
        configuration.database().ref(`groups/${groupId}/users/`)
          .push({
            displayName
          });
        userValidation(req, res, userId, groupId, displayName);
      }
    })
    .catch(() => {
      serverError(res);
    });
};
/**
 * @description This controller posts message to a group
 * POST:/api/v1/groups/:groupId/message
 *
 * @param {object} req request object
 * @param {object} res response
 *
 * @return { object } return an object message details
 */
export const postMessage = (req, res) => {
  const { groupMessage, priority, displayName } = req.body;
  const { groupId, groupName } = req.params;
  req.check('groupMessage', 'Message field cannot be empty')
    .notEmpty().matches(/\w/);
  const errors = req.validationErrors();
  const timeStamp = moment().format('LLLL');

  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({
      message
    });
  } else {
    const messageKey = configuration.database().ref('messages/')
      .push({})
      .key;
    const messageRef = configuration.database()
      .ref(`messages/${messageKey}/groups/${groupId}`);
    messageRef.push({
      groupMessage,
      priority,
      timeStamp,
      displayName
    });
    const groupRef = configuration.database().ref(`groups/${groupId}/messages`);
    groupRef.push({
      groupMessage,
      priority,
      timeStamp,
      displayName,
    })
      .then(() => {
        res.status(201).json({
          status: 'Message posted successfully',
          groupMessage,
          priority,
          timeStamp,
          displayName,
          groupName
        });
      })
      .catch(() => {
        serverError(res);
      });
    sendEmailNotifications(groupId, priority);
    sendSMSNotifications(groupId, priority);
  }
};

/**
 * @description This controller fetches a user group
 * GET:/api/v1/:userId/groups
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return { object } return an object containing user groups
 */
export const getUserGroup = (req, res) => {
  const userId = req.params.userId;
  const userGroups = [];

  configuration.database().ref(`/users/${userId}/groups`)
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
    .catch(() => {
      serverError(res);
    });
};

/**
 * @description This controller fetches a particular group messages
 * GET:/api/v1/group/:groupId
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing a particular group message
 */
export const getGroupMessage = (req, res) => {
  const groupId = req.params.groupId;
  const groupMessage = [];

  configuration.database().ref(`/groups/${groupId}/messages`)
    .once('value', (snap) => {
      let message = {};
      snap.forEach((details) => {
        message = {
          messageId: details.key,
          groupMessage: details.val().groupMessage,
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
    .catch(() => {
      serverError(res);
    });
};

/**
 * @description This controller fetches a users in a particular group
 * GET:/api/v1/group/:groupId/users
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing user and userId
 */
export const getUserInGroup = (req, res) => {
  const groupId = req.params.groupId;
  const users = [];

  configuration.database().ref(`/groups/${groupId}/users`)
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
    .catch(() => {
      serverError(res);
    });
};

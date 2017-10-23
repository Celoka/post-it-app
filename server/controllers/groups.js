/**
 * Module dependencies
 */
import nodemailer from 'nodemailer';
import Nexmo from 'nexmo';
import db from '../config/config';
import Utils from '../utils/index';

require('dotenv').config();
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
  req.check('groupname', 'Groupname is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    const groupKey = db.database().ref('/groups').push({
      groupname,
      datecreated: timestamp
    }).key;

    const groupRef = db.database().ref(`/groups/${groupKey}/users`);
    groupRef.push({
      userNames: userId
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
          message: 'Unauthorized operation,please signup/signin'
        });
      } else {
        res.status(500).json({
          message: `An error occured ${error.message}`
        });
      }
    });
  }
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
export const addMemberToGroup = (req, res) => {
  const { groupId, userId, newUser } = req.body;
  const user = req.user.uid;
  req.check('newUser', 'Username is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else if (user) {
    db.database().ref(`groups/${groupId}/users/${userId}/`).set({
      userId,
      newUser
    });
    db.database().ref(`/users/${userId}`)
    .once('value', (snapshot) => {
      if (snapshot.exists()) {
        const { username, email, phonenumber } = snapshot.val();
        db.database().ref(`groups/${groupId}`)
        .once('value', (snap) => {
          const groupname = snap.val().groupname;
          db.database().ref(`/users/${userId}/groups/${groupId}`)
        .update({
          userId,
          newUser,
          groupname
        });
        });
        db.database().ref(`groups/${groupId}/groupname`)
        .once('value', (groupSnapshot) => {
          if (groupSnapshot.exists()) {
            db.database().ref(`groups/${groupId}/users/username`)
            .set(username);
            db.database().ref(`groups/${groupId}/email`)
            .push(email);
            db.database().ref(`groups/${groupId}/phonenumber`)
            .push(phonenumber);
          } else {
            res.status(403).json({ message:
               'Group does not exists'
            });
          }
        })
        .then(() => {
          res.status(201).json({
            message: 'User added successfully'
          });
        });
      } else {
        res.status(403).json({
          message: 'This User is not registered or does not exist'
        });
      }
    })
      .catch((error) => {
        res.status(500).json({
          message: `An error occured ${error.message}`
        });
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
    const groupRef = db.database().ref(`groups/${groupId}/messages`);
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
          message: `An error occured ${error.message}`
        });
      });
  } else {
    res.status(403).json({
      message: 'Unauthorized operation,please signup/signin'
    });
  }
  const email = [];
  db.database().ref(`groups/${groupId}/email`)
  .once('value', (snap) => {
    snap.forEach((details) => {
      email.push(details.val());
    });
    const emails = email.join(',');

    if ((priority === 'Urgent') || (priority === 'Critical')) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_NAME,
          pass: process.env.PASSWORD
        }
      });
      const mailOptions = {
        from: ' "Post It Admin" <eloka.chima@gmail.com>',
        to: emails,
        subject: 'Urgent Message',
        text: 'Post it App',
        html: '<h3>An urgent message has been posted on post It</h3>'
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info);
      });
    }
  });

  const phoneNumber = [];
  db.database().ref(`groups/${groupId}/phonenumber`)
  .once('value', (snap) => {
    snap.forEach((details) => {
      phoneNumber.push(details.val());
    });
    if (priority === 'Critical') {
      const nexmo = new Nexmo({
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET
      });
      const from = 'Post It Admin';
      const to = phoneNumber;
      const text = 'A message has been posted on post it app';
      nexmo.message.sendSms(from, to, text);
    }
  });
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
          message: `An error occured ${error.message}`
        });
      });
  } else {
    res.status(403).json({
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
        message: details.val().message,
        time: details.val().timestamp,
        priority: details.val().priority,
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

export const getUserInGroup = (req, res) => {
  const groupId = req.params.groupId;
  const user = req.user.uid;
  if (user) {
    const users = [];
    db.database().ref(`/groups/${groupId}/users`)
    .once('value', (snap) => {
      let usersInGroup = {};
      snap.forEach((details) => {
        usersInGroup = {
          userName: details.val().newUser,
          userId: details.val().userId
        };
        users.push(usersInGroup);
      });
      res.status(200).json({
        message: 'User retrieved successfully',
        users
      })
      .catch((error) => {
        res.status(500).json({
          message: `An error occured ${error.message}`
        });
      });
    });
  } else {
    res.status(403).json({
      message: 'Unauthorized operation, please signup/signin'
    });
  }
};

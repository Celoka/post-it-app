/**
 * Module dependencies
 */
import firebase from 'firebase';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import Nexmo from 'nexmo';
import db from '../config/config';

require('dotenv').config();


/**
 * @description describes a function that takes in a string,
 * as a parameter, takes the string to lower case and returns
 * the first character to upper case
 *
 * @param { string } character
 *
 * @function normalizeString
 *
 * @return { string } a string with first character as an uppercase
 */
export const normalizeString = (character) => {
  const string = character.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * @description describes a function thats sets and encodes a token
 * containing the user details to be decoded in the client side and
 * also used to make server requests
 *
 * @param { string } uid user id to be encoded
 * @param { string } userName username to be encoded
 * @param { string } email email of user to be encoded
 *
 * @return { string } this is the token containing encoded user details
 */
export const token = (uid, userName, email) => {
  const jwtToken = jwt.sign({
    uid,
    displayName: userName,
    email },
  process.env.SECRET_TOKEN,
  { expiresIn: 60 * 60 });
  return jwtToken;
};


/**
 * @description describes a function that takes in two parameters,
 * and sends an email notification when a message is posted based
 * on the priority level(Urgent)
 *
 * @param { string } groupId this is the group id for message to be posted in
 * @param { string } priority this is the priority level of the message
 *
 * @function sendEmailNotifications
 *
 * @return { object } return object containg message body
 */
export const sendEmailNotifications = (groupId, priority) => {
  const email = [];
  db.database().ref(`groups/${groupId}/email`)
  .once('value', (snapShot) => {
    snapShot.forEach((details) => {
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
        html: '<h3>An urgent message has been posted on post it </h3>'
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info);
      });
    }
  });
};


/**
 * @description describes a function that takes in two parameters,
 * and sends an sms notification when a message is posted based
 * on the priority level(Critical)
 *
 * @param { string } groupId this is the group id for message to be posted in
 * @param { string } priority this is the priority level of the message
 *
 * @function sendEmailNotifications
 *
 * @return { object } return object containg message body
 */
export const sendSMSNotifications = (groupId, priority) => {
  const phoneNumber = [];
  db.database().ref(`groups/${groupId}/phoneNumber`)
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
      const text = 'A critical message has been posted on post it';
      nexmo.message.sendSms(from, to, text);
    }
  });
};

/**
 * @description describes a function that pushes a member to a group when the
 * addMemberToGroup controller has been called
 *
 * @param { object } req request object containing the userdetails
 * @param { object } res response object containg the user deatils added
 * to the group
 * @param { string } groupId this is the groupid for the user to be added to
 * @param { string } email this is the email address of the member
 * @param { string } phoneNumber this is the phone number of the user
 * @param { string } userId this is the user Id of the user to be added
 * @param { string } displayName displayname of the member to be added
 *
 * @return { void }
 */
export const pushMemberDetails = (
    req, res, groupId, email, phoneNumber, userId, displayName
  ) => {
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
  })
  .catch(() => {
    res.status(500).json({ message: 'Hey..Stop! Something went wrong' });
  });
};
/**
 * @description describes a function that checks if a user exists in agroup
 *
 * @param { object } req request object
 * @param { object } res response object
 * @param { string } userId the userid of the member to be checked for
 * @param { string } groupId group id
 * @param { string } displayName this is the displayname of the user
 *
 * @return { void }
 */
export const userValidation = (req, res, userId, groupId, displayName) => {
  db.database().ref(`/users/${userId}`)
  .once('value', (userSnapShot) => {
    if (userSnapShot.exists()) {
      const { email, phoneNumber } = userSnapShot.val();
      db.database().ref(`groups/${groupId}`)
      .once('value', (snap) => {
        const groupName = snap.val().groupName;
        db.database().ref(`/users/${userId}/groups/${groupId}`)
        .update({
          displayName,
          groupName
        });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Hey..Stop! Something went wrong.'
        });
      });
      pushMemberDetails(
          req, res, groupId, email, phoneNumber, userId, displayName
        );
    } else {
      res.status(404).json({
        message: 'User details not found'
      });
    }
  })
  .catch(() => {
    res.status(500).json({
      message: 'Hey..Stop! Something went wrong.'
    });
  });
};
/**
 * @description describes a function that sets the group details to the group
 * node and the user node in firebase
 *
 * @param { object } req request object containing the group details
 * @param { object } res response object containg group details
 * @param { string } groupName this is the group name to be created
 * @param { string } timeStamp this is the time stamp when the group was created
 * @param { string } displayName this is the name of the username
 * @param { string } userId the uid of the user creating the group
 *
 * @return { void }
 */
export const setGroupDetails = (
  req, res, groupName, timeStamp, displayName, userId) => {
  const groupKey = db.database().ref('/groups')
  .push({
    groupName,
    dateCreated: timeStamp
  }).key;
  db.database().ref(`/groups/${groupKey}/users`)
  .push({
    displayName
  });
  db.database().ref(`/users/${userId}/groups`)
  .child(groupKey)
  .set({
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
  .catch(() => {
    if (!userId) {
      res.status(401).json({ message: 'Login to perform this operation' });
    } else {
      res.status(500).json({ message: 'Hey..Stop! Something went wrong.' });
    }
  });
};

/**
 * @description describes a function that registers a user when a user name
 * to be registered is not existing
 *
 * @param { object } req request object
 * @param { object } res response object
 * @param { string } email email of the new user
 * @param { string } password password of the new user
 * @param { string } displayName the username of the user
 * @param { string } phoneNumber the mobile phone number of the user
 *
 * @return { void }
 */
export const registerUser = (
  req, res, email, password, displayName, phoneNumber) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    const { uid } = user;
    user.updateProfile({
      displayName
    });
    db.database().ref(`users/${uid}`).set({
      email,
      password,
      displayName,
      phoneNumber
    });
    db.database().ref('usernames').push({
      displayName,
      phoneNumber
    });
    const jwtToken = token(uid, displayName);
    res.status(201).json({
      message: 'Registration success',
      jwtToken,
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    if (errorCode === 'auth/email-already-in-use') {
      res.status(401).json({
        message: 'Email already in use'
      });
    } else {
      res.status(500).json({
        message: 'Hey..Stop! Something went wrong.'
      });
    }
  });
};

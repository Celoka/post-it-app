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
 * @param { string } groupId
 * @param { string } priority
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
 * @param { string } groupId
 * @param { string } priority
 * @param { string } groupName
 *
 * @function sendEmailNotifications
 *
 * @return { object } return object containg message body
 */
export const sendSMSNotifications = (groupId, priority, groupName) => {
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
  });
};

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

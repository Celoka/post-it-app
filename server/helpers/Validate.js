
/**
 * Module dependencies
 */
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
};

/**
 * @description describes a function that takes in two parameters,
 * and sends an sms notification when a message is posted based
 * on the priority level(Critical)
 *
 * @param { string } groupId
 * @param { string } priority
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
        const text = 'A message has been posted on post it app';
        nexmo.message.sendSms(from, to, text);
      }
    });
};

/**
 * @description describes a function that validates a user
 * input on signup
 *
 * @param { object } req
 * @param { object } res
 * @param { function } next
 *
 * @function  validateCreateUser
 *
 * @return { object } return object containing validation error message
 */
export const validateCreateUser = (req, res, next) => {
  req.check('email', 'Email is required').notEmpty();
  req.check('userName', 'Username is required').notEmpty().matches(/\w/);
  req.check('email', 'Bad email format').isEmail();
  req.check('password', 'Password is required').notEmpty();
  req.check('phoneNumber', 'Phone number is required').notEmpty().matches(/\d/);
  req.check('password',
   'Password must be at least 6 character and contain number')
  .isLength({ min: 5 })
  .matches(/\d/);

  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};

/**
 * @description describes a function that validates a user
 * input on login
 *
 * @param { object } req
 * @param { object } res
 * @param { function } next
 *
 * @function  validateLogin
 *
 * @return { object } return object containing validation error message
 */
export const validateLogin = (req, res, next) => {
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Invalid email format').isEmail();
  req.check('password', 'Password is required').notEmpty();
  req.check('password',
   'Password must be at least 6 character and contain number')
  .isLength({ min: 5 })
  .matches(/\d/);

  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};

/**
 * @description describes a function that validates string
 * when a group is being created
 *
 * @param { object } req
 * @param { object } res
 * @param { function } next
 *
 * @function  validateCreateGroup
 *
 * @return { object } return object containing validation error message
 */
export const validateCreateGroup = (req, res, next) => {
  req.check('group', 'Groupname is required').notEmpty().matches(/\w/);
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};

/**
 * @description describes a function that validates string for input field
 * when a member is being added to a group
 *
 * @param { object } req
 * @param { object } res
 * @param { function } next
 *
 * @function validateAddmember
 *
 * @return { object } return object containing validation error message
 */
export const validateAddmember = (req, res, next) => {
  req.check('newUser', 'Username is required').notEmpty().matches(/\w/);
  req.check('userId', 'UserId is requied').notEmpty();
  req.check('groupId', 'GroupId is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};

/**
 * @description describes a function that validates input string
 * for email when requesting for a password reset
 *
 * @param { object } req
 * @param { object } res
 * @param { function } next
 *
 * @function validateResetPassword
 *
 * @return { object } return object containing validation error message
 */
export const validateResetPassword = (req, res, next) => {
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Invalid email format').isEmail();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};

export const token = (uid, userName) => {
  const jwtToken = jwt.sign({
    uid,
    displayName: userName,
  },
  process.env.SECRET_TOKEN,
  { expiresIn: 60 * 60 });
  return jwtToken;
};

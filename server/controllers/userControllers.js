/**
 * Import module dependencies
 */
import firebase from 'firebase';

import configuration from '../config/configuration';
import {
  registerUser,
  normalizeString,
  token,
  mapCodeToObject,
  serverError
} from '../helpers/serverHelpers';

/**
 * @description This controller creates a new user
 * POST:/api/v1/user/signup
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing a user
 */
export const createUser = (req, res) => {
  const { email, password, userName, phoneNumber } = req.body;
  const displayName = normalizeString(userName);

  configuration.database().ref('usernames')
    .once('value', (snapShot) => {
      const names = [];
      snapShot.forEach((details) => {
        names.push(
          details.val().displayName,
          details.val().phoneNumber
        );
      });
      if (names.indexOf(displayName) > -1) {
        res.status(409).json({
          message: 'Username already exists'
        });
      } else if (names.indexOf(phoneNumber) > -1) {
        res.status(409).json({
          message: 'Phone number already exists'
        });
      } else {
        registerUser(req, res, email, password, displayName, phoneNumber);
      }
    })
    .catch(() => {
      serverError(res);
    });
};

/**
 * @description This controller signs a registered user in
 * POST:/api/v1/user/signin
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing a logged in user
 */
export const logIn = (req, res) => {
  const { email, password } = req.body;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      const { uid, displayName } = user;
      const jwtToken = token(uid, displayName);
      res.status(200).send({
        message: 'User Signed in!',
        user,
        jwtToken,
        isConfirmed: true
      });
    })
    .catch((error) => {
      const codeObject = mapCodeToObject[error.code];
      if (codeObject) {
        return res.status(codeObject.status).json({
          message: codeObject.message
        });
      }
      return serverError();
    });
};

/**
 * @description describes a controller for google sign up
 * POST:/api/v1/user/googlesignin
 *
 * @param { object } req request object
 * @param { object } res response object
 *
 * @return { object } returns a google user object
 */
export const googleSignIn = (req, res) => {
  const { email, uid, userName } = req.body;
  const displayName = normalizeString(userName);
  const jwtToken = token(uid, displayName, email);
  configuration.database().ref('users')
    .once('value', (snapShot) => {
      const emails = [];
      snapShot.forEach((details) => {
        emails.push(details.val().email);
      });
      if (emails.indexOf(email) > -1) {
        res.status(200).json({
          message: 'Login successful',
          jwtToken,
          isConfirmed: true
        });
      } else {
        res.status(200).json({
          message: 'Another step is required ',
          jwtToken,
          isConfirmed: false
        });
      }
    })
    .catch(() => {
      serverError(res);
    });
};

/**
 * @description describes a controller for google update
 * POST:/api/v1/user/googleupdate
 *
 * @param { object } req request object
 * @param { object } res response object
 *
 * @return { object } user object encoded in jwt
 */
export const googleUpdate = (req, res) => {
  const { phoneNumber, uid, displayName, email } = req.body;

  configuration.database().ref(`users/${uid}`)
    .set({
      email,
      displayName,
      phoneNumber
    })
    .then(() => {
      const jwtToken = token(uid, displayName, email);
      configuration.database().ref('usernames').push({
        displayName
      });
      res.status(201).json({
        message: 'Update was succcessful',
        jwtToken,
        isConfirmed: true
      });
    })
    .catch(() => {
      serverError(res);
    });
};

/**
 * @description This controller handles a user reset password
 * POST:/api/v1/user/passwordreset
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing a message
 */
export const resetPassword = (req, res) => {
  const email = req.body.email;

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      res.status(200).json({
        message: 'Reset link sent succesfully',
        isConfirmed: true
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const codeObject = mapCodeToObject[error.code];
      if (errorCode === 'auth/user-not-found') {
        return res.status(404).json({
          message: 'User email not found'
        });
      } else if (codeObject) {
        return res.status(codeObject.status).json({
          message: codeObject.message
        });
      }
      return serverError(res);
    });
};

/**
 * @description This method handles a user sign out
 * POST:/api/v1/user/signout
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing a message;
 */
export const logOut = (req, res) => {
  firebase.auth().signOut()
    .then(() => {
      res.status(200).json({
        message: 'Signed out!',
      });
    })
    .catch(() => {
      serverError(res);
    });
};

/**
 * @description This controller fetches all registered
 * user in the app
 *
 * GET:/api/v1/allusers
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return all users and users details
 */
export const getAllUsers = (req, res) => {
  const usersDetails = [];

  configuration.database().ref('users')
    .once('value', (snapShot) => {
      let usersInGroup = {};
      snapShot.forEach((details) => {
        usersInGroup = {
          userId: details.key,
          displayName: details.val().displayName
        };
        usersDetails.push(usersInGroup);
      });
      res.status(200).json({
        message: 'Users retrieved successfully',
        usersDetails
      });
    })
    .catch(() => {
      serverError(res);
    });
};

/**
 * @description This controller fetches all users
 * added to a group
 *
 * GET:/api/v1/groups/:groupId/members
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return all user details
 */
export const newUsersInGroup = (req, res) => {
  const groupId = req.params.groupId;
  const users = [];

  configuration.database().ref(`groups/${groupId}/users`)
    .once('value', (snapShot) => {
      let newUsers = {};
      snapShot.forEach((details) => {
        newUsers = {
          userId: details.val().userId,
          displayName: details.val().displayName
        };
        users.push(newUsers);
      });
      res.status(200).json({
        users
      });
    })
    .catch(() => {
      serverError(res);
    });
};

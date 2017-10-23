/**
 * Module dependencies
 */
import firebase from 'firebase';
import db from '../config/config';

/**
 * @description This controller creates a news user
 * POST:/user/signup
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an obejct containing a user
 */
export const createUser = (req, res) => {
  const { email, password, username, phonenumber } = req.body;
  req.check('email', 'Email is required').notEmpty();
  req.check('username', 'Username is required').notEmpty();
  req.check('email', 'Please put a valid email').isEmail();
  req.check('password', 'Password is required').notEmpty();
  req.check('password', 'Password must be a mininum of 6 character')
  .isLength(6, 50);

  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        db.database().ref(`users/${user.uid}`).set({
          email,
          password,
          username,
          phonenumber
        });
        let parsedUser;
        try {
          parsedUser = JSON.parse(JSON.stringify(user));
        } catch (error) {
          res.status(500).json({
            error
          });
        }
        const token = parsedUser.stsTokenManager.accessToken;
        res.status(200).json({
          message: 'Registration success',
          userDetails: parsedUser.providerData,
          token
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          res.status(401).json({
            message: 'email already in use.'
          });
        } else {
          res.status(500).json(errorMessage);
        }
      });
  }
};

/**
 * @description This controller signs a registered in
 * POST:/user/signin
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing a logged in user
 */
export const logIn = (req, res) => {
  const { email, password } = req.body;
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Please put a valid email').isEmail();
  req.check('password', 'Password is required').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        let parsedUser;
        try {
          parsedUser = JSON.parse(JSON.stringify(user));
        } catch (err) {
          res.status(401).send({
            message: 'Please enter a valid login details'
          });
        }
        const token = parsedUser.stsTokenManager.accessToken;
        const { uid: userId, providerData: userDetails } = parsedUser;
        res.status(200).send({
          message: 'User Signed in!',
          userDetails,
          userId,
          token
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: `${error.message}`
        });
      });
  }
};

/**
 * @description This controller handles a user reset password
 * POST:/user/passwordreset
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing a message
 */
export const resetPassword = (req, res) => {
  const email = req.body.email;
  req.check('email', 'auth/invalid-email').notEmpty();
  req.check('email', 'auth/invalid-email').isEmail();

  firebase.auth().sendPasswordResetEmail(email)
    .then((user) => {
      res.status(200).json({
        message: 'Mail sent succesfully',
        user
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: `An error occured ${error.message}`
      });
    });
};


/**
 * @description This method handles a user sign out
 * POST:/user/signout
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing a message;
 */
export const logOut = (req, res) => {
  const user = req.user.uid;
  if (user) {
    firebase.auth().signOut()
    .then(() => {
      res.status(200).json({
        message: 'Signed out!',
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
 * @description This controller fetches a user in a group
 * GET:/user/group
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an object containing the user details;
 */
export const getUser = (req, res) => {
  const user = req.user.uid;
  if (user) {
    const query = db.database().ref(`users/${user}`);
    query.once('value').then((snapshot) => {
      const result = [];
      snapshot.forEach((childSnapshot) => {
        const value = childSnapshot.val();
        const key = childSnapshot.key;
        if (key === 'groups') {
          result.push(value);
        }
      });
      return res.status(200).json({
        result
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
 * @description This controller fetches all registered
 * user in the app
 *
 * GET:/user/group
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return all users and users details
 */
export const getAllUsersInGroup = (req, res) => {
  const user = req.user.uid;
  if (user) {
    const usersDetails = [];
    db.database().ref('users')
    .once('value', (snap) => {
      let usersInGroup = {};
      snap.forEach((details) => {
        usersInGroup = {
          userId: details.key,
          userNames: details.val().username
        };
        usersDetails.push(usersInGroup);
      });
      res.status(200).json({
        message: 'Users retrieved successfully',
        usersDetails
      });
    });
  } else {
    res.status(403).json({
      message: 'Unauthorized operation, please signup/signin'
    });
  }
};

/**
 * @description This controller fetches all users
 * added to a group
 *
 * GET:/groups/:groupId/members
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return all user details
 */
export const newUsersInGroup = (req, res) => {
  const groupId = req.params.groupId;
  const user = req.user.uid;
  if (user) {
    const users = [];
    db.database().ref(`groups/${groupId}/users`)
    .once('value', (snap) => {
      let newUsers = {};
      snap.forEach((details) => {
        newUsers = {
          userNames: details.val().newUser
        };
        users.push(newUsers);
      });
      res.status(200).json({
        users
      });
    });
  } else {
    res.status(403).json({
      message: 'Unauthorized operation, please signup/signin'
    });
  }
};

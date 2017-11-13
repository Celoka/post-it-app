/**
 * Import module dependencies
 */
import firebase from 'firebase';
import db from '../config/config';
import { normalizeString, token } from '../helpers/Validate';


/**
 * @description This controller creates a new user
 * POST:/user/signup
 *
 * @param {object} req request object
 * @param {object} res response object
 *
 * @return {object} return an obejct containing a user
 */
export const createUser = (req, res) => {
  const { email, password, userName, phoneNumber } = req.body;
  const displayName = normalizeString(userName);
  db.database().ref('usernames')
  .once('value', (snapShot) => {
    const names = [];
    snapShot.forEach((details) => {
      names.push(details.val().displayName);
    });
    if (names.indexOf(displayName) > -1) {
      res.status(409).json({ message: 'Username already exists' });
    } else {
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
          displayName
        });
        const jwtToken = token(uid, displayName);
        res.status(201).json({
          message: 'Registration success',
          jwtToken,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          res.status(401).json({
            message: 'Email already in use'
          });
        } else {
          res.status(500).json({
            message: errorMessage
          });
        }
      });
    }
  });
};

/**
 * @description This controller signs a registered user in
 * POST:/user/signin
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
      jwtToken
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/user-not-found') {
      res.status(401).json({
        message:
          'Make sure your email or password is correct'
      });
    } else {
      res.status(500).json({
        message: errorMessage
      });
    }
  });
};

/**
 * @description describes a controller for google sign up
 *
 * @param { object } req request object
 * @param { object } res response object
 *
 * @return { object } returns a google user object
 */
export const googleSignIn = (req, res) => {
  const result = req.body;
  const credential =
  firebase.auth.GoogleAuthProvider.credential(result.credential.idToken);
  db.database().ref(`users/${result.user.uid}`)
  .once('value', (snap) => {
    if (!snap.exists()) {
      db.database().ref(`users/${result.user.uid}`)
      .set({
        userName: result.user.displayName,
        email: result.user.email,
        phoneNumber: result.user.phoneNumber
      });
      firebase.auth().signInWithCredential(credential)
      .then((user) => {
        res.status(200).json({
          message: 'Google sign in successful',
          user
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        res.status(500).json({
          message: errorMessage
        });
      });
    } else {
      firebase.auth().signInWithCredential(credential)
      .then((user) => {
        res.status(200).json({
          message: 'Google sign in successful',
          user
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        res.status(500).json({
          message: errMessage
        });
      });
    }
  })
  .catch((err) => {
    const errMessage = err.message;
    res.status(500).json({
      message: errMessage
    });
  });
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
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    res.status(200).json({
      message: 'Mail sent succesfully',
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/user-not-found') {
      res.status(404).json({
        message: 'Email does not exist'
      });
    } else {
      res.status(500).send({
        errorMessage
      });
    }
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
  firebase.auth().signOut()
  .then(() => {
    res.status(200).json({
      message: 'Signed out!',
    });
  })
  .catch((error) => {
    const errorMessage = error.message;
    res.status(500).json({
      message: `An error occured ${errorMessage}`
    });
  });
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
export const getAllUsers = (req, res) => {
  const usersDetails = [];
  db.database().ref('users')
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
  .catch((error) => {
    const errorMessage = error.message;
    res.status(500).json({
      message: `An error occured ${errorMessage}`
    });
  });
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
  const users = [];
  db.database().ref(`groups/${groupId}/users`)
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
  .catch((error) => {
    const errorMessage = error.message;
    res.status(500).json({
      message: `An error occure ${errorMessage}`
    });
  });
};


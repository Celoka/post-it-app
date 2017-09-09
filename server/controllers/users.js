import firebase from 'firebase';
import db from '../config/config';

export const createUser = (req, res) => {
  const { email, password, username, phonenumber } = req.body;

  req.check('email', 'Email is required').notEmpty();
  req.check('username', 'Username is required').notEmpty();
  req.check('email', 'Please put a valid email').isEmail();
  req.check('password', 'Password is required').notEmpty();
  req.check('password', 'Password must be a mininum of 4 character')
  .isLength(4, 50);
  // req.check('phonenumber', 'phonenumber is required').isMobilePhone('en-GB');

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
        res.status(200).json({
          message: 'Registration success',
          userDetails: user.providerData
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          res.status(400).json({
            message: 'email already in use.'
          });
        } else {
          res.status(400).json(errorMessage);
        }
      });
  }
};

export const logIn = (req, res) => {
  const { email, password } = req.body;
  req.check('email', 'Email is required').notEmpty();
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
          res.status(500).send('');
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
      .catch(() => {
        res.status(401).send({
          message: 'Wrong password or email'
        });
      });
  }
};

export const resetPassword = (req, res) => {
  const email = req.body.email;
  firebase.auth().sendPasswordResetEmail(email)
    .then((user) => {
      res.status(200).json({
        message: 'Password reset successful',
        user
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.code
      });
    });
};

export const logOut = (req, res) => {
  firebase.auth().signOut()
    .then((user) => {
      res.status(200).json({
        message: 'Signed out!',
        user
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.code
      });
    });
};

export const getUser = (req, res) => {
  const user = req.user.uid;
  if (user) {
    const query = db.database().ref(`users/${user}`);
    query.once('value')
    .then((snapshot) => {
      console.log(snapshot.val);
      const result = [];
      snapshot.forEach((childSnapshot) => {
        const value = childSnapshot.val();
        const key = childSnapshot.key;
        if (key === 'groups') {
          result.push(value);
        }
      });
      return res.status(200).json({
        result,
        user
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message
      });
    });
  } else {
    res.status(403).json({
      message: 'Unauthorized operation, please signup/signin'
    });
  }
};

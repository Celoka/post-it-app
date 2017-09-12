/**
 * Module dependencies
 */
import firebase from 'firebase';
import db from '../config/config';
import Utils from '../utils/index';

/**
 * @description create user group controller
 * @param {*} req
 * @param {*} res
 */
export const createGroup = (req, res) => {
  const groupname = req.body.groupname;
  const userId = req.user.uid;
  const timestamp = new Date().toString();

  const groupKey = db.database().ref('groups/').push({
    groupname,
    datecreated: timestamp
  }).key;

  const groupRef = db.database().ref(`groups/${groupKey}/users`);
  groupRef.set({
    administrator: true
  });

  const userRef = db.database().ref(`users/${userId}/groups`);
  userRef.child(groupKey).set({
    groupname,
    administrator: true
  }).then(() => {
    res.status(200).send({
      message: 'User group created successfully',
      groupname,
      groupKey
    });
  })
    .catch((error) => {
      if (!userId) {
        res.status(403).json({
          message: 'Unauthorized operation,please signup/signin',
        });
      } else {
        res.status(500).json({
          message: error,
        });
      }
    });
};

/**
 * @description Add member controller
 * @param {*} req
 * @param {*} res
 */
export const addUser = (req, res) => {
  const groupId = req.params.groupId;
  const newUser = req.body.newUser;
  const user = req.user.uid;

  if (user) {
    const groupRef = db.database().ref(`/groups/${groupId}/users`);
    groupRef.child(newUser).set({
      userId: newUser,
    });

    const userRef = db.database().ref(`/users/${user}/groups`);
    userRef.child(groupId).update({
      userId: newUser,
    })
        .then(() => {
          res.status(200).json({
            message: 'New user added successfully' });
        })
        .catch((error) => {
          res.status(500).json({
            message: error.message });
        });
  } else {
    res.status(403).send({
      message: 'Unauthorized operation,please signup/signin' });
  }
};

/**
 * @description post message controller
 * @param {*} req
 * @param {*} res
 */
export const sendMessage = (req, res) => {
  const { message, groupId, priority } = req.body;
  const user = req.user.uid;
  const timestamp = new Date().toString();

  if (user) {
    const messageKey = db.database().ref('messages/').push({
    }).key;
    const messageRef = db.database().ref(`messages/${messageKey}/groups/${groupId}/users`);
    messageRef.set({
      message,
      priority,
      timestamp
    });
    const groupRef = firebase.database().ref(`groups/${groupId}/messages`);
    groupRef.set({
      messageKey,
      user,
      message
    })
      .then(() => {
        res.status(200).json({
          message: 'Message posted successfully' });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message });
      });
  } else {
    res.status(403).json({
      message: 'Unauthorized operation,please signup/signin' });
  }
};

export const getGroup = (req, res) => {
  const user = req.user.uid;
  if (user) {
    const query = db.database().ref('/groups').orderByKey();
    query.once('value', (snapshot) => {
      const childData = snapshot.val();
      const userGroups = Utils.normalizeData(childData);
      return res.status(200).json({ userGroups });
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

export const getGroupMessages = (req, res) => {
  const user = req.user.uid;
  if (user) {
    const query = db.database().ref('/groups').orderByKey();
    query.once('value', (snapshot) => {
      const childData = snapshot.val();
      const userGroups = Utils.normalizeData(childData);
      return res.status(200).json({ userGroups });
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
// export const getGroupMessages = (req, res) => {
//   // const { messagesId, groupId } = req.params;
//   const user = req.user.uid;
//   if (user) {
//     const query = db.database().ref('/messages').orderByKey();
//     query.once('value')
//     .then((snapshot) => {
//       snapshot.forEach((childSnapshot) => {
//         const childData = childSnapshot.val();
//         console.log(childSnapshot);
//         return res.status(200).json({ childData });
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: error.message
//       });
//     });
//   } else {
//     res.status(403).json({
//       message: 'Unauthorized operation, please signup/signin'
//     });
//   }
// };

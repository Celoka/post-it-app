import firebase from 'firebase';
import db from '../config/config';

// export const authenticateUser = (req, res, next) => {
//   const user = firebase.auth().currentUser;
//   const token = req.headers.authorization || req.headers['x-access-token'];
//   if (token && user) {
//     admin.auth().verifyIdToken(user.uid)
//         .then((decodedToken) => {
//           req.uid = decodedToken.uid;
//         }).catch((error) => {
//           res.status(401).json({
//             message: 'Failed to authenticate token.', error
//           });
//         });
//     next();
//   } else {
//     res.status(401).json({
//       message: 'You are not authorized, please signup or login.'
//     });
//   }
// };


const getCurrentUser = () => new Promise((resolve) => {
  db.auth().onAuthStateChanged((user) => {
    if (user) {
      resolve(user);
    }
    resolve({});
  });
});
export default getCurrentUser;

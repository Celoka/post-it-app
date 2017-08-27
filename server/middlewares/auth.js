import db from '../config/config';

// const isLoggedin = (req, res, next) => {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       res.status(200).send({ user });
//       next();
//     } else {
//       res.status(401).send('you are not authorized');
//     }
//   });
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

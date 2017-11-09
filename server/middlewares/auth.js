import db from '../config/config';

/**
 * @description describe a function that listens to change,
 * a firebase method is invoked when a change occurs
 *
 * @function getCurrentUser
 *
 * @return { Object } user
 *
 */
const getCurrentUser = () => new Promise((resolve) => {
  db.auth().onAuthStateChanged((user) => {
    if (user) {
      resolve(user);
    }
    resolve({});
  });
});
export default getCurrentUser;

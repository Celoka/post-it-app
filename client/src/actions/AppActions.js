import axios from 'axios';
// import Firebase from 'firebase';
import { GET_ALL_USERS, REGISTER_NEW_USER, LOGIN_USER }
from '../constants/constants';
import dispatcher from '../dispatcher/dispatcher';

/**
 * @return {*} user details
 * @param {*} user
 */
export function registerUser(user) {
  return axios.post('/user/signup', user);
}

/**
 * @return {*} user login
 * @param {*} user
 */
export function loginUser(user) {
  return axios.post('/user/signin', user).then((response) => {
    dispatcher({
      type: LOGIN_USER,
      user: response.data.user
    });
  }).catch((error) => {
    if (error.response) {
      alert(`${error.response.data.message}.`);
    }
  });
}

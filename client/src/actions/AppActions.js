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
    const token = response.data.user.email;
    localStorage.setItem('token', JSON.stringify(token));
    console.log(localStorage);
    dispatcher({
      type: LOGIN_USER,
      user: response.data.user
    });
  }).catch((error) => {
    if (error.response) {
      console.log(error.response);
      // alert(`${error.response.data.message}.`);
    }
  });
}

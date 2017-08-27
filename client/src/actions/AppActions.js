import axios from 'axios';
// import Firebase from 'firebase';
import AppConstants from '../constants/AppConstants';
import appDispatcher from '../dispatcher/dispatcher';

/**
 * @return {*} user details
 * @param {*} user
 */
export function registerUser(user) {
  return axios.post('/user/signup', user).then((response) => {
    appDispatcher.dispatch({
      type: REGISTER_NEW_USER,
      user: response.data.user
    });
  });
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
    appDispatcher.dispatch({
      type: LOGIN_USER,
      user: response.data.user
    });
  }).catch((error) => {
    if (error.response) {
      console.log(error.response);
    }
  });
}

export function createGroup(group) {
  return axios.post('/group', group).then((response) => {
    appDispatcher.dispatch({
      type: CREATE_USER_GROUP,
      group: response.data.group
    });
  }).catch((error) => {
    if (error.response) {
      console.log(error.response);
    }
  });
}

export function getGroup(group) {
  return axios.post('/group', group).then((response) => {
    appDispatcher.dispatch({
      type: GET_USER_GROUP,
      group: response.data.group
    });
  }).catch((error) => {
    if (error.response) {
      console.log(error.response);
    }
  });
}


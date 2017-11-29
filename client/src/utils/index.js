
import toastr from 'toastr';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppActions from '../actions/AppActions';

/**
 * @description describes a function that pops a notification
 * when an error occurs
 *
 * @function ToastrError
 *
 * @param { object } error messages
 *
 * @return { object } error message
 */
export const ToastrError = (error) => {
  if (error.message === 'Request failed with status code 401' ||
    error.message === 'Request failed with status code 403'
  ) {
    AppActions.logOut();
  } else if (error.message === 'Request failed with status code 500') {
    toastr.error('An unexpected error occurred.');
  } else if (error.message === 'Network Error') {
    toastr.error('There was an error in network connection');
  }
  const status = error.response.data.message;
  toastr.error(status);
};
/**
 * @description describes a function that sets the token to the header
 * for subsequent persistence of request to the server
 *
 * @param { string } token encoded here in is the user object.
 * details like uid, displayname
 *
 * @return { void }
 */
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

/**
 * @description describes a function that receives user object from the server
 * and dispatches this data to the store
 *
 * @param { object } response contains the user object encoded in jwt code
 *
 * @return { void }
 */
export const setCurrentUser = (response) => {
  const { jwtToken } = response.data;
  localStorage.setItem('token', jwtToken);
  setAuthToken(jwtToken);
  const userDetails = jwt.decode(localStorage.token);
  localStorage.setItem('displayName',
   JSON.stringify(userDetails.displayName));
  localStorage.setItem('uid', userDetails.uid);
  toastr.success(`Welcome, ${userDetails.displayName}`);
  AppDispatcher.dispatch({
    actionType: AppConstants.SET_USER,
    userDetails
  });
};

/**
 * @description describes a function that checks and validates a user
 * email
 *
 * @param { string } email this is the user email to be validated
 *
 * @return { string } this returns an email after the validation
 */
export const validateEmail = (email) => {
  const regexForEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexForEmail.test(email);
};


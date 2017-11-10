
import toastr from 'toastr';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppActions from '../actions/AppActions';


/**
 * @function ToastrError
 *
 * @param { object } error
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

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};
export const setCurrentUser = (response) => {
  const { jwtToken } = response.data;
  localStorage.setItem('token', jwtToken);
  setAuthToken(jwtToken);
  const userDetails = jwt.decode(localStorage.token);
  localStorage.setItem('displayName',
   JSON.stringify(userDetails.displayName));
  toastr.success(`Welcome, ${userDetails.displayName}`);
  AppDispatcher.dispatch({
    actionType: AppConstants.SET_USER,
    userDetails
  });
};


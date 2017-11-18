import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import App from '../src/components/presentation/App';
import AppConstants from '../src/constants/AppConstants';
import AppDispatcher from '../src/dispatcher/AppDispatcher';
import { setAuthToken } from '../src/utils/';
/**
 * @description describes a condition that checks for a current user
 * and persistently dispatches the user details to the store to keep
 * the user logged until the token has expired
 *
 */
if (localStorage.token) {
  setAuthToken(localStorage.token);
  const userDetails = jwt.decode(localStorage.token);
  AppDispatcher.dispatch({
    actionType: AppConstants.SET_USER,
    userDetails
  });
}

ReactDOM.render(<App />,
  document.getElementById('app'));

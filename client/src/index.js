import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import App from './components/App.jsx';
import AppConstants from '../src/constants/AppConstants';
import AppDispatcher from '../src/dispatcher/AppDispatcher';
import { setAuthToken } from '../src/utils/';

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

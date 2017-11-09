import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import setAuthToken from '../src/vendors/index';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}

ReactDOM.render(<App />,
document.getElementById('app'));

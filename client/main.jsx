import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// import HomePage from './Components/HomePage.jsx';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
// import AppActions from './Actions/appActions';
// import AppActiontypes from './Actions/appActiontypes';
// import Routes from './routes.js';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
   <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>
  ), document.getElementById('react-app'));

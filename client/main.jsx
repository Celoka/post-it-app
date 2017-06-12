import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import App from './App.jsx';
import HomePage from './src/Components/HomePage.jsx'
// import ViewActions from './src/Actions/appActions.js';
// import KeyMirror from './src/Actions/appActiontypes.js';
import Routes from './routes.js';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

 /*ReactDom.render((
   <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory} routes={routes} />
    <HomePage />
   </MuiThemeProvider>
  ), document.getElementById('app'));*/


 ReactDOM.render(<HomePage/>, document.getElementById('app'));

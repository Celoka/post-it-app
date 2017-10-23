import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import Routes from '../Routes.jsx';

/**
 * @description creates a class app as a react component
 * 
 * @class App
 * 
 * @extends {React.Component}
 */
class App extends React.Component {

  render() {
    return (
      <div>
         <BrowserRouter>
            <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

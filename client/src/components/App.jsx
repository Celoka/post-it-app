import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import Routes from '../Routes.jsx';

/**
 * 
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
/**
 * React life cycle method, adds listens to change from the app store.
 * @returns {*} Listener
 * @memberof AppComponent
 */
  componentDidMount() {
  
    AppStore.addChangeListener(this.onChange);
  }

/**
 * React life cycle method, removes change listener.
 * @returns {*} Listener
 * @memberof AppComponent
 */
  componentUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

  /**
 * Updates view state when change is received.
 * @returns {*}
 * @memberof AppComponent
 */
  onChange() {
    // this.setState(getAppState());
  }

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

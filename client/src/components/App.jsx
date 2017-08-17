import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../Routes.jsx';

/**
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   *
   * @returns {Routes} Pages rendered via routes.
   * @memberof App
   */
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

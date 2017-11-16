import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../Routes.jsx';

const App = () => ({
  /**
   * @description describes a stateless component that wraps other
   * within it for rendering
   *
   * @returns { component } components wrapped in a router
   *
   * @function App
   */
  render() {
    return (
      <div className="wrapper">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
});

export default App;

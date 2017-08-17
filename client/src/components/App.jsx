import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../Routes.jsx';
import Navbar from '../components/Navbar.jsx';
import Broadcastboard from '../components/Broadcastboard.jsx';
import newComponent from './newComponent.jsx';

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

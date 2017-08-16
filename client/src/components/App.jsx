import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../Routes.jsx';
import Navbar from '../components/Navbar.jsx';
import Broadcastboard from '../components/Broadcastboard.jsx';
import newComponent from './newComponent.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
         <Router>
          <Routes />
        </Router>  
      </div>
      );
   }
}

export default App;

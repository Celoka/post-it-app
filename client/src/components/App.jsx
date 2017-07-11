import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Home from '../components/Homepage.jsx';


class App extends React.Component {
   render() {
      return (
         <div>
            <Home />
            <Navbar />
         </div>
      );
   }
}

export default App;

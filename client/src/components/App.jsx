import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Homepage from '../components/Homepage.jsx';


class App extends React.Component {
   render() {
      return (
         <div>
            <Homepage />
            <Navbar />
         </div>
      );
   }
}

export default App;

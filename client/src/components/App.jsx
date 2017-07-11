import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';


class App extends React.Component {
   render() {
      return (
         <div>
            <Footer />
            <Navbar />
         </div>
      );
   }
}

export default App;

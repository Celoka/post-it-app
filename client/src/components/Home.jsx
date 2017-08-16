import React from 'react';
import { Link} from 'react-router-dom';
import Header from './Navbar.jsx';


class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
          <section className="hero container">
            <br/>
            <h1>Post It Message App</h1>
            <h2><p>Information sharing has just been taken to a whole new level. <br/>
            With Post It, information sharing is made easy.</p></h2>
            <button className="register"><Link to="/signup"> Register Now </Link></button>
          </section>
      </div>
    );
  }
}

export default Home;
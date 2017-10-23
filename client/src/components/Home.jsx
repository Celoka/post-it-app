import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';

/**
 * @description a stateless component
 * that is a child of message board. The
 * message list and groupname are rendered to the screen
 * in this component
 *
 * @return { void }
 *
 * @function MessageForm
 */
const Home = () => ({
  render() {
    return (
      <div>
        <Navbar />
        <section id='text' className="hero container">
          <br />
          <h1>
            Post It Message App
          </h1>
          <h2>
            <p>
              Information sharing has just been
              taken to a whole new level.
              <br />
              With Post It, information sharing is made easy.
            </p>
          </h2>
          <button className="register">
            <Link to="/signup">
              Register Now
            </Link>
          </button>
        </section>
      </div>
    );
  }
});

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';

/**
 * @description describes a stateless component that has
 * child components
 *
 * @return { jsx } jsx markup element
 *
 * @function Home
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

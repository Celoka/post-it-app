import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

/**
 * @description describes a component that
 * handles page that does not exist
 *
 * @return { jsx } rendered jsx elements
 *
 * @function notFoundPage
 */
const NotFoundPage = () => ({
  render() {
    return (
      <div>
        <Navbar />
        <img src="http://res.cloudinary.com/dnsteufwj/image/upload/v1510500970/404_e9uzrw.jpg"
          id="not-found" />
        <Link to="/" id="not-found-text">
          <h3>
            Click to Go back to Home
          </h3>
        </Link>
      </div>
    );
  }
});
export default NotFoundPage;

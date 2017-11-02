import React from 'react';
import { Link } from 'react-router-dom';

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
        <h1>
          Page not found
        </h1>
        <p>
          Whoops! There is nothing to see here.
        </p>
        <p>
          <Link to="/">
            Back to Home
          </Link>
        </p>
      </div>
    );
  }
});
export default NotFoundPage;

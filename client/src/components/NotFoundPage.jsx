import React from 'react';
import { Link } from 'react-router-dom';

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
const notFoundPage = () => ({
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
export default notFoundPage;

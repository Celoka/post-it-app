import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class notFoundPage
 * @extends {React.Component}
 */
class notFoundPage extends React.Component {
  /**
   *
   * @returns {}
   * @memberof notFoundPage
   */
  render() {
    return (
          <div>
            <h1>Page not found</h1>
            <p>Whoops! Theres nothing to see here.</p>
            <p><Link to="/"> Back to Home</Link></p>
          </div>
    );
  }
}
export default notFoundPage;

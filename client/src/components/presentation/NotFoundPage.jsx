import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';

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
        <div className="col-sm-12">
          <Link to="/" style={{ float: 'unset' }}>
            <img style={{ width: '100%' }} src="http://res.cloudinary.com/dnsteufwj/image/upload/v1510500970/404_e9uzrw.jpg"
              id="not-found" />
          </Link>

        </div>
      </div>
    );
  }
});
export default NotFoundPage;

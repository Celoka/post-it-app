import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';


const IndexPage = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">Post It App</IndexLink>
      </div>

      <div className="top-bar-right">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>

    </div>

    {children}

  </div>

);

IndexPage.propTypes = {
  children: PropTypes.object.isRequired
};

export default IndexPage;
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description describes a stateless component
 * that controls navigation of app.
 *
 * @return { jsx } jsx markup element
 *
 * @function NavBar
 */
const NavBar = () => ({
  render() {
    return (
      <div>
        <nav className="menu navbar navbar-default">
          <div className="container-fluid">
            <ul className='nav navbar-nav'>
              <li><h2><Link to='/'><strong>Post It</strong></Link></h2></li>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/signup'> Sign Up </Link></li>
              <li><Link to='/signin'> Sign In </Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});

export default NavBar;

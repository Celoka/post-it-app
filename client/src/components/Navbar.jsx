import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @class NavBar
 * @extends {React.Component}
 */
class NavBar extends React.Component {
  /**
   *
   * @returns
   * @memberof NavBar
   */
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className='nav navbar-nav'>
              <li><h2><Link to='/'> <strong>Post It</strong> </Link></h2></li>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/signup'> Sign Up </Link></li>
              <li><Link to='/signin'> Sign In </Link></li>
            </ul>
          </div>
        </nav>
      </div>
      );
   }
}

export default NavBar;

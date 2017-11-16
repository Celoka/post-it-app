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
        <nav className="navbar navbar-default">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to='/' className="navbar-brand"><strong>Post It</strong></Link>
            </div>

            <div className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/signup'> Sign Up </Link></li>
                <li><Link to='/signin'> Sign In </Link></li>
              </ul>
              

            </div>
          </div>
        </nav>
      </div>
    );
  }
});

export default NavBar;

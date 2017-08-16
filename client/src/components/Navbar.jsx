import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
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

export default Header;
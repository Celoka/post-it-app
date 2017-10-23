import React from 'react';
import { Link } from 'react-router-dom';
import AppActions from '../actions/AppActions';

/**
 *
 * @class BoardNavigation
 * @extends {React.Component}
 */
class BoardNavigation extends React.Component {

  onClick = (event) => {
    AppActions.logOut();
  }

  render() {
    return (
      <div>
          <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle"
                  data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                </button>
                <Link to='/dashboard'className="navbar-brand">
                  <h1> 
                    Post It 
                  </h1>
                </Link>
              </div>
              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li onClick={this.onClick}><Link to= '/'>Sign Out </Link></li>
                </ul>
              </div>
            </div>
          </nav>
      </div>
    );
  }
}
export default BoardNavigation;

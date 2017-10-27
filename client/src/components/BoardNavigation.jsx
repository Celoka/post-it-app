import React from 'react';
import { Link } from 'react-router-dom';
import AppActions from '../actions/AppActions';


/**
 * @description creates a class boardnavigation as a react component
 *
 * @class BoardNavigation
 *
 * @extends {React.Component}
 */
class BoardNavigation extends React.Component {

/**
 * @method onClick
 *
 * @return { void }
 *
 * @memberof BoardNavigation
 */
  logOut = () => {
    AppActions.logOut();
  }

/**
 * @method render
 *
 * @returns { Jsx } rendered jsx element
 *
 * @memberof BoardNavigation
 */
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header brand-header">
              <button type="button" className="navbar-toggle"
                data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
              </button>
              <Link to='/dashboard'className="navbar-brand">
                <h1>
                  Post It
                </h1>
              </Link>
              <i className="material-icons message-icon">message</i>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li onClick={this.logOut}>
                  <Link to= '/'>
                    <span>Sign Out</span>
                    <i className="material-icons">power_settings_new</i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default BoardNavigation;

import React from 'react';
import { Link } from 'react-router-dom';
import AppActions from '../actions/AppActions';

/**
 * @description describes a function that fires an
 * action when a user logsout.
 *
 * @return { void }
 *
 * @function logOut
 */
const logOut = () => {
  AppActions.logOut();
};

const BoardNavigation = () => ({
/**
 * @method render
 *
 * @returns { Jsx } jsx markup
 *
 * @function BoardNavigation
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
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li onClick={logOut} >
                  <Link to= '/'>
                    <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

export default BoardNavigation;

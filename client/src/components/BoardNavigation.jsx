import React from 'react';

/**
 *
 * @class BoardNavigation
 * @extends {React.Component}
 */
class BoardNavigation extends React.Component {
    /**
     *
     * @returns
     * @memberof BoardNavigation
     */
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
                <a href='/broadcastboard'className="navbar-brand">
                 <h2> Post It </h2>
                </a>
              </div>
              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li><span className="glyphicons glyphicons-user"></span></li>
                </ul>
              </div>
            </div>
          </nav>
      </div>
    );
  }
}
export default BoardNavigation;

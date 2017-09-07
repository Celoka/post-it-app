import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @class BoardNavigation
 * @extends {React.Component}
 */
class BoardNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // Binding the click event to enable it work in the callback.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
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
                <Link to='/broadcastboard'className="navbar-brand"><h2> Post It </h2></Link>
              </div>
              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to= '/'><span onClick = {this.handleClick}> {this.state.isToggleOn ? 'Sign Out' : 'Sign out'} </span></Link></li>
                </ul>
              </div>
            </div>
          </nav>
      </div>
    );
  }
}
export default BoardNavigation;

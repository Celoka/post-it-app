import React from 'react';
import Navbar from '../presentation/Navbar';
import AppActions from '../../actions/AppActions';


/**
 * @description creates a class sign up as a react component
 *
 * @class GoogleUpdate
 *
 * @param { object } event
 *
 * @extends { React.Component }
 */
class GoogleUpdate extends React.Component {
  /**
   * @description Creates an instance of GoogleUpdate.
   *
   * @return { void }
   *
   * @memberof GoogleUpdate
   */
  constructor() {
    super();
    this.state = {
      phoneNumber: '',
      email: JSON.parse(localStorage.getItem('email')),
      displayName: JSON.parse(localStorage.getItem('displayName')),
      uid: localStorage.getItem('uid'),
    };
  }

  /**
  * @description Monitors changes in the components and change the state
  *
  * @param { string } event
  *
  * @method onChange
  *
  * @return { void }
  *
  * @memberof Login
  */
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description describes method fires an action to update
   * a users google account
   *
   * @param { object } event
   *
   * @method onSubmit
   *
   * @return { void }
   *
   * @memberof Login
   */
  onSubmit = (event) => {
    const credential = { ...this.state };
    event.preventDefault();
    AppActions.googleUpdate(credential)
      .then(() => {
        this.props.history.push('/dashboard');
      });
  }
  /**
   * @return { jsx } jsx markup
   *
   * @memberof GoogleUpdate
   */
  render() {
    return (
      <div>
        <Navbar />
        <div id="signin">
          <h1>Google Update</h1>
          <form onSubmit={this.onSubmit}>
            <fieldset
              id="signinfieldset"
              className="account-info">
              <h3>
                Dear {this.state.displayName}, this final step is
                required for the completion of your registration.
              </h3>
              <label>
                Phone Number
                <input
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  className='form-control'
                  type="inputPhone"
                  name="phoneNumber"
                  pattern="[234][0-9]{12}"
                  placeholder="ex.2349000000000"
                  required />
              </label>
            </fieldset>
            <button
              id="sign"
              type="submit"
              name="submit"
              style={{ marginBottom: 10 }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default GoogleUpdate;

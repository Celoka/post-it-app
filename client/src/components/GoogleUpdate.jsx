import React from 'react';
import Navbar from '../components/Navbar';
import AppActions from '../actions/AppActions';

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
 *
 * @param { object } props
 *
 * @return { void }
 *
 * @memberof GoogleUpdate
 */
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      email: JSON.parse(localStorage.getItem('email')),
      displayName: JSON.parse(localStorage.getItem('displayName')),
      uid: localStorage.getItem('uid'),
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

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
            name="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default GoogleUpdate;

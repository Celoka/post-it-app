import React from 'react';
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';

import Navbar from '../presentation/Navbar';
import { validateEmail } from '../../utils/';
import AppActions from '../../actions/AppActions';

/**
 * @description creates a class sign up as a react component
 *
 * @class SignUp
 *
 * @extends { React.Component }
 */
class CreateUser extends React.Component {

  /**
   * @description Creates an instance of MessageBoard
   *
   * @return { void }
   *
   * @memberof CreateUser
   */
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
      phoneNumber: '',
      message: '',
      allUsers: []
    };
  }

  /**
   * @description Monitors changes in the components and change the state
   *
   * @param { string } event this contains string of characters
   *
   * @method onChange
   *
   * @return { void }
   *
   * @memberof CreateUser
   */
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description method fires an action to register a user with email,
   * phonenumber, username and password
   *
   * @param { object } event this contains string of characters
   *
   * @method onSubmit
   *
   * @return {void }
   *
   * @memberof CreateUser
   */
  onSubmit = (event) => {
    event.preventDefault();
    const credentials = { ...this.state };
    if (!validateEmail(this.state.email)) {
      toastr.error('Enter a valid email');
    } else if (this.state.password !== this.state.confirmPassword) {
      toastr.error('Password does not match');
    } else {
      AppActions.registerUser(credentials)
        .then((res) => {
          if (res) {
            this.props.history.push('/dashboard');
          }
        });
    }
  }
  /**
   * @return { jsx } rendered jsx element
   *
   * @memberof CreateUser
   */
  render() {
    if (localStorage.token) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <Navbar />
        <div id="signup" >
          <h1>Create Account</h1>
          <form onSubmit={this.onSubmit} >
            <fieldset
              id="signupfieldset"
              className="account-info">
              <label>
                Email Address
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  className={'form-control'}
                  type="email"
                  name="email"
                  className='form-control'
                  required />
              </label>
              <label>
                Password
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  className='form-control'
                  required />
              </label>
              <label>
                Confirm Password
                <input
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  className='form-control'
                  type="password"
                  name="confirmPassword"
                  required />
              </label>
              <label>
                Username
                <input
                  value={this.state.userName}
                  onChange={this.onChange}
                  className='form-control'
                  type="text"
                  name="userName"
                  required />
              </label>
              <label>
                Phonenumber
                <input
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  className='form-control'
                  type="inputPhone"
                  name="phoneNumber"
                  pattern="[234][0-9]{12}"
                  placeholder="ex.2349000000000" required />
              </label>
            </fieldset>
            <button
              id="sign"
              type="submit"
              name="submit"
              style={{ width: 118, marginBottom: 10 }}>
              Register Now
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default CreateUser;

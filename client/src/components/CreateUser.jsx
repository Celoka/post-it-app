import React from 'react';
import toastr from 'toastr';
import Navbar from '../components/Navbar.jsx';
import { validateEmail } from '../utils/';
import AppActions from '../actions/AppActions';

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
 * @param { object } props
 *
 * @return { void }
 *
 * @memberof CreateUser
 */
  constructor(props) {
    super(props);
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
 * @param { string } event
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
 * @param { object } event
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
     .then(() => {
       this.props.history.push('/dashboard');
     });
    }
  }
/**
 * @return { jsx } rendered jsx element
 *
 * @memberof CreateUser
 */
  render() {
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
                  required/>
              </label>
              <label>
                Password
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  className='form-control'
                  required/>
              </label>
              <label>
               Confirm Password
                <input
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  className='form-control'
                  type="password"
                  name="confirmPassword"
                  required/>
              </label>
              <label>
                Username
                <input
                  value={this.state.userName}
                  onChange={this.onChange}
                  className='form-control'
                  type="text"
                  name="userName"
                  required/>
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
              name="submit">
              Register Now
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default CreateUser;

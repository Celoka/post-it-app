import React from 'react';
import toastr from 'toastr';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import { validateEmail } from '../utils/';
import AppActions from '../actions/AppActions';
import Navbar from '../components/Navbar.jsx';

/**
 * @description creates a class sign up as a react component
 *
 * @class SignIn
 *
 * @extends { React.Component }
 */
class Login extends React.Component {

  /**
   *
   * @return {void}
   *
   * @memberof SignIn
   */
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isConfirmed: localStorage.getItem('isConfirmed')
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
   * @description method fires an action to sign in a user
   *
   * @param { object } event default behaviour of a submit method
   *
   * @method onSubmit
   *
   * @return { void }
   *
   * @memberof Login
   */
  onSubmit = (event) => {
    event.preventDefault();
    const signInDetails = { ...this.state };
    if (!validateEmail(this.state.email)) {
      toastr.error('Enter a valid email');
    } else {
      AppActions.loginUser(signInDetails)
        .then((res) => {
          if (res) {
            this.props.history.push('/dashboard');
          } else {
            this.props.history.push('/signin');
          }
        });
    }
  }
  /**
   * @description Create google login function
   * for alternative sign up method.
   *
   * @method googleSignIn
   *
   * @param { Object } event
   *
   * @memberof Login
   *
   * @return { void }
   */
  googleSignIn = (event) => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const { displayName: userName, email, uid } = result.user;
        const googleUserDetails = {
          email,
          uid,
          userName
        };
        AppActions.googleLogin(googleUserDetails)
          .then((res) => {
            if (res.isConfirmed) {
              this.props.history.push('/dashboard');
            } else {
              this.props.history.push('/googlepage');
            }
          });
      });
  };
  /**
   * @return { jsx } jsx markup element
   *
   * @memberof Login
   */
  render() {
    return (
      <div>
        <Navbar />
        <div id="signin">
          <h1> Account Login </h1>
          <form onSubmit={this.onSubmit}>
            <fieldset
              id="signinfieldset"
              className="account-info">
              <label>
                Email Address
                  <input
                  value={this.state.email}
                  onChange={this.onChange}
                  className='form-control'
                  type="email"
                  name="email" />
              </label>
              <label>
                Password
                  <input
                  value={this.state.password}
                  onChange={this.onChange}
                  className='form-control'
                  type='password'
                  name='password' />
              </label>
              <Link to='/resetpassword'>
                Forgot password? Click to reset password
              </Link>
            </fieldset>
            <div id="button-segment">
              <button
                id="sign"
                type="submit"
                name="submit">
                Login
              </button>
              <label id="checkbox" >
                <input
                  type="checkbox"
                  name="remember" />
                Stay signed in.
              </label>
              <GoogleButton
                id="googlebutton"
                onClick={this.googleSignIn} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;

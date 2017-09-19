import React from 'react';
import toastr from 'toastr';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import ResetPassword from './ResetPassword.jsx';
import Header from '../components/Navbar.jsx';

/**
 *
 * @class SignIn
 * @extends {React.Component}
 */
class SignIn extends React.Component {
  /**
   * @return {void}
   * @param {any} props
   * @memberof SignIn
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }
  /**
   * @return {void}
   * @param {any} event
   * @memberof SignIn
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * @description method fires an action to sign in a user
   * @param {any} event
   * @memberof SignIn
   */
  onSubmit(event) {
    event.preventDefault();
    const signInDetails = { ...this.state };
    AppActions.loginUser(signInDetails)
      .then(() => {
        AppStore.on('login_success', this.getCurrentUser);
        toastr.success('Login Successful');
        this.props.history.push('/dashboard');
      }).catch((err) => {
        const error = err.response.data;
        toastr.error('Login Unsuccessful');
        this.setState({
          error
        });
      });
  }
  /**
   * @description gets the current user
   * @return {void}
   * @memberof SignIn
   */
  getCurrentUser() {
    this.setState({
      user: AppStore.getCurrentUser()
    });
  }
  /**
   * @description Create google login function for alternative sign up method.
   * @param {any} Event 
   * @return {void}
   * @memberof SignIn
   */
  googleSignIn(event) {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        toastr.success('Login Successful');
        const { user } = result;
        if (user) {
          return this.props.history.push('/dashboard');
        }
      });
  }
  /**
   *
   * @return
   * @memberof SignIn
   */
  render() {
    return (
      <div>
          <Header />
        <div id="signin">
          <h1> Account Login </h1>
          <form onSubmit={this.onSubmit}>
            <fieldset id="signinfieldset" className="account-info">
              <label>
                Email Address
                  <input value={this.state.email} onChange={this.onChange}
                  type="email" name="email" required />
              </label>
              <label>
                Password
                  <input value={this.state.password} onChange={this.onChange}
                  type='password' name='password' />
              </label>
              <Link to='/resetpassword'>Forgot password? Click to reset password</Link>
            </fieldset>
            <div id="button-segment">
              <button id="sign" type="submit" name="submit"
              >Login </button>
              <label id="checkbox" >
                <input type="checkbox" name="remember" /> Stay signed in.
                </label>
              <GoogleButton id="googlebutton" onClick={this.googleSignIn} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default SignIn;

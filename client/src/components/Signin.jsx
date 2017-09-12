import React from 'react';
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
 *
 * @param {any} props
 * @memberof SignIn
 */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }
/**
 *@return
 * @param {any} event
 * @memberof SignIn
 */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
/**
 *
 * @param {any} event
 * @memberof SignIn
 */
  onSubmit(event) {
    event.preventDefault();
    const signInDetails = {
      email: this.state.email,
      password: this.state.password
    };
    AppActions.loginUser(signInDetails)
    .then(() => {
      AppStore.on('login_success', this.getCurrentUser);
      this.props.history.push('/dashboard');
    }).catch((err) => {
      const error = err.response.data;
      this.setState({
        error
      });
    });
  }
/**
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
   * @param
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
        const user = result.user;
        if (user) {
          this.props.history.push('/dashboard');
        }
      });
  }
  /**
   *
   * @return
   * @memberof SignIn
   */
  render() {
    const { error } = this.state;
    return (
      <div>
        <Header />
        <div id="signin">
          <h1> Account Login </h1>
            <form onSubmit={this.onSubmit}>
            { error && <center><span className="alert alert-danger">
              {error}</span>
            <hr/></center> }
              <fieldset className="account-info">
                <label>
                  Email Address
                  <input value={this.state.email} onChange={this.onChange}
                   type="email" name="email" required />
                </label>
                <label>
                  Password
                  <input value ={this.state.password} onChange={this.onChange}
                   type='password' name='password'/>
                </label>
                  <Link to='/resetpassword'>Forgot password? Click to reset password</Link>
              </fieldset>
              <GoogleButton id= "googlebutton" onClick={this.googleSignIn} />
              <button id= "sign" type="submit" name="submit"
              >Login </button>
                <label >
                  <input type="checkbox" name="remember" /> Stay signed in.
              </label>
          </form>
        </div>
      </div>
    );
  }
}
export default SignIn;

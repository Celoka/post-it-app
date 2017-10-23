import React from 'react';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import ResetPassword from './ResetPassword.jsx';
import Header from '../components/Navbar.jsx';

/**
 * @description creates a class sign up as a react component
 * 
 * @class SignIn
 * 
 * @extends { React.Component }
 */
class SignIn extends React.Component {

/**
 *  
 * @param {object} props
 * 
 * @return {void}
 * 
 * @memberof SignIn
 */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: [],
    };
  }

 /**
 * @description Monitors changes in the components and change the state
 * 
 * @param { string } event
 * 
 * @method onChange
 * 
 * @memberof Signup
 */
  onChange = (event )=> {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description method fires an action to sign in a user
   * 
   * @param { object } event
   * 
   * @method onSubmit
   * 
   * @memberof SignIn
   */
  onSubmit=(event)=>{
    event.preventDefault();
    const signInDetails = { ...this.state }
    AppActions.loginUser(signInDetails).then(() => {
      AppStore.on('login_success', this.getCurrentUser);
      this.props.history.push('/dashboard');
    });
  }

/**
 * @description This method gets the current user
 *
 * @param { void } 
 * 
 * @method getCurrentUser
 * 
 * @memberof SignIn
 * 
 * @return { object } user object from the store is set to state
 */
  getCurrentUser = () => {
    this.setState({
      user: AppStore.getCurrentUser()
    });
  }

/**
 * @description Create google login function 
 * for alternative sign up method.
 * 
 * @method googleSignIn 
 * 
 * @param { Object } Event 
 * 
 * @memberof SignIn
 * 
 * @return { void }
 */
  googleSignIn=(event)=> {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then((response) => {
        toastr.success('Login Successful');
        const { user } = response;
        if (user) {
          return this.props.history.push('/dashboard');
        }
      });
  }

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
              <Link to='/resetpassword'>
                Forgot password? Click to reset password
              </Link>
            </fieldset>
            <div id="button-segment">
              <button id="sign" type="submit" name="submit">
                Login
              </button>
              <label id="checkbox" >
                <input type="checkbox" name="remember" />
                Stay signed in.
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

import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import * as actions from '../actions/AppActions';
import UsersStore from '../stores/UsersStore';
import Header from '../components/Navbar.jsx';
import db from '../../../dist/routesconfig/config.js';
class SignIn extends React.Component{

constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const SignInDetails = {
      email: this.state.email,
      password: this.state.password
    };
    actions.loginUser(SignInDetails).then(() => {
      UsersStore.on('login_success', this.getUser);
      this.props.history.push('/broadcastboard');
    });
  }

  getUser() {
    this.setState({ user: UsersStore.getUser()});
  }

  authenticate() {
    firebase.initializeApp(config);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        if (user) {
          firebase.auth().onAuthStateChanged(() => {
            this.props.history.push('/broadcastboard');
          });
        }
        console.log(token);
        console.log(user);
      });
  }
  render() {
    return(
      <div>
        <Header />
        <div id="signin">
          <h1> Account Login </h1>
            <form onSubmit={this.onSubmit}>
              <fieldset className="account-info">
                <label>
                  Email Address
                  <input value={this.state.email} onChange={this.onChange} type="email" name="email" required />
                </label>
                <label>
                  Password
                  <input value ={this.state.password} onChange={this.onChange} type="password" name="password" />
                </label>
                  <h5>Sign in with <Link to="">google</Link></h5>
              </fieldset>
              <fieldset id="signin-btn" className="account-action">
                <input className="btn" type="submit" name="submit" value="Login" />
                <label>
                  <input type="checkbox" name="remember" /> Stay signed in.
              </label>
              </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
export default SignIn;
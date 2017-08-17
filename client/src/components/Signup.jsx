import React from 'react';
import { Link } from 'react-router-dom';

import { registerUser } from '../actions/AppActions';
import usersStores from '../stores/UsersStore';
import Header from '../components/Navbar.jsx';

/**
 *
 * @class SignUp
 * @extends {React.Component}
 */
class SignUp extends React.Component {
/**
 * Creates an instance of SignUp.
 * @param {any} props
 * @memberof SignUp
 */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      message: '',
      registerError: {},
      registerSuccess: {}
    };
    this.onChange = this.onChange.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
/**
 * @memberof SignUp
 */
  componentDidMount() {
    usersStores.on('change', this.getStatus);
  }
/**
 *
 * @memberof SignUp
 */
  getStatus() {
    const status = usersStores.getStatus();
    this.setState({
      registerError: status.error,
    });
    console.log(status);
  }
/**
 * @param {any} event
 * @memberof SignUp
 */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
/**
 *
 * @param {any} event
 * @memberof SignUp
 */
  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    registerUser(this.state).then(() => {
      this.props.history.push('/signin');
      alert('User account created! Enter your email and password.');
    }, () => {
          //
    });
  }
/**
 * @returns
 * @memberof SignUp
 */
  render() {
    return (
      <div>
        <Header />
        <div id="signup" >
          <h1>Create Account</h1>
          <form onSubmit={this.onSubmit}>
            <fieldset className="account-info">
              <label>
                Email Address
                <input value={this.state.email} onChange={this.onChange}
                type="email"
                placeholder="name@domain.com" name="email" required />
              </label>
              <label>
                Username
                <input value={this.state.username} onChange={this.onChange}
                 type="text" name="username" />
              </label>
              <label>
                Password
                <input value ={this.state.password} onChange={this.onChange}
                 type="password" name="password"/>
              </label>
              <h5> Already a member? Click <Link to="/signin">here</Link>
               to sign in.</h5>
            </fieldset>
            <fieldset id="signup-btn" className="account-action">
              <input className="btn" type="submit" name="submit"
               value="Register Now" />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
export default SignUp;

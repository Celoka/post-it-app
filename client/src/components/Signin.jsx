import React from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../actions/AppActions';
import UsersStore from '../stores/UsersStore';
import Header from '../components/Navbar.jsx';

/**
 *
 * @class SignIn
 * @extends {React.Component}
 */
class SignIn extends React.Component {
/**
 * Creates an instance of SignIn.
 * @param {any} props
 * @memberof SignIn
 */
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
    const SignInDetails = {
      email: this.state.email,
      password: this.state.password
    };
    actions.loginUser(SignInDetails).then(() => {
      UsersStore.on('login_success', this.getUser);
      this.props.history.push('/broadcastboard');
    });
  }
/**
 *@return
 * @memberof SignIn
 */
  getUser() {
    this.setState({ user: UsersStore.getUser() });
  }
/**
 *
 * @returns
 * @memberof SignIn
 */
  render() {
    return (
      <div>
        <Header />
        <div id="signin">
          <h1> Account Login </h1>
            <form onSubmit={this.onSubmit}>
              <fieldset className="account-info">
                <label>
                  Email Address
                  <input value={this.state.email} onChange={this.onChange}
                   type="email" name="email" required />
                </label>
                <label>
                  Password
                  <input value ={this.state.password} onChange={this.onChange}
                   type="password" name="password" />
                </label>
                  <h5>Sign in with <Link to="">google</Link></h5>
              </fieldset>
              <fieldset id="signin-btn" className="account-action">
                <input className="btn" type="submit" name="submit"
                 value="Login" />
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

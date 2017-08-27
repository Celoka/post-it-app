import React from 'react';
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
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      message: '',
    };
    this.onChange = this.onChange.bind(this);
    // this.getStatus = this.getStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
/**
 * @memberof SignUp
 */
  componentDidMount() {
    // usersStores.on('change', this.getStatus);
  }
/**
 *
 * @memberof SignUp
 */
  // getStatus() {
  //   const status = usersStores.getStatus();
  //   console.log(status, 'oooo');
  //   this.setState({
  //     registerError: status.error,
  //   });
  //   console.log(status);
  // }
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
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    };
    registerUser(user).then(() => {
      this.setState({ email: '', password: '' });
      this.props.history.push('/broadcastboard');
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
          <form>
            <fieldset className="account-info">
              <label>
                Email Address
                <input value={this.state.email} onChange={this.onChange}
                type="email" name="email" required />
              </label>
              <label>
                Username
                <input value ={this.state.username} onChange={this.onChange}
                 type="email" name="username" />
              </label>
              <label>
                Password
                <input value ={this.state.password} onChange={this.onChange}
                 type="password" name="password"/>
              </label>
              <label>
                Phonenumber
                <input value ={this.state.phoneNumber} onChange={this.onChange}
                 type="number" name="phoneNumber"/>
              </label>
            </fieldset>
              <button onClick={this.onSubmit} type="submit" name="submit"
              >Register Now </button>
          </form>
        </div>
      </div>
    );
  }
}
export default SignUp;

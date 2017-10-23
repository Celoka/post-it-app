import React from 'react';
import toastr from 'toastr';
import AppStore from '../stores/AppStore';
import Header from '../components/Navbar.jsx';
import AppActions from '../actions/AppActions';


/**@description creates a class sign up as a react component
 * 
 * @class SignUp
 * 
 * @extends { React.Component }
 */
class SignUp extends React.Component {

/**
 * @description Creates an instance of MessageBoard 
 * 
 * @param { object } props
 * 
 * @return { void }
 * 
 * @memberof SignIn
 */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      phonenumber: '',
      message: ''
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
 * @memberof SignUp
 */
  onSubmit =(event)=> {
    event.preventDefault();
    const userDetails = { ...this.state };
    AppActions.registerUser(userDetails).then(() => {
      this.props.history.push('/dashboard');
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div id="signup" >
          <h1>Create Account</h1>
          <form onSubmit={this.onSubmit} >
            <fieldset id="signupfieldset" className="account-info">
              <label>
                Email Address
                <input value={this.state.email} onChange={this.onChange}
                  type="email" name="email" required />
              </label>
              <label>
                Password
                <input value={this.state.password} onChange={this.onChange}
                  type="password" name="password" />
              </label>
              <label>
                Username
                <input value={this.state.username} onChange={this.onChange}
                  type="text" name="username" />
              </label>
              <label>
                Phonenumber
                <input value={this.state.phonenumber} onChange={this.onChange}
                  type="inputPhone" name="phonenumber" />
              </label>
            </fieldset>
            <button id="sign" type="submit" name="submit"
            >Register Now </button>
          </form>
        </div>
      </div>
    );
  }
}
export default SignUp;

import React from 'react';
import toastr from 'toastr';
import AppStore from '../stores/AppStore';
import Header from '../components/Navbar.jsx';
import AppActions from '../actions/AppActions';


class SignUp extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      username: '',
      phonenumber: '',
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const userDetails = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      phonenumber: this.state.phonenumber
    };
    AppActions.registerUser(userDetails).then(() => {
      toastr.success(`Registration successful. Welcome ${this.state.username}`);
      this.props.history.push('/dashboard');
    }).catch((error) => {
      toastr.error('Registration failed.');
      const message = error.response.data.message;
      this.setState({
        message
      });
    });
  }

  render() {
   
    return (
      <div>
        <Header />
        <div id="signup" >
          <h1>Create Account</h1>
          <form onSubmit = {this.onSubmit} >
            <fieldset id= "signupfieldset"className="account-info">
              <label>
                Email Address
                <input value={this.state.email} onChange={this.onChange}
                type="email" name="email" required />
              </label>
              <label>
                Password
                <input value ={this.state.password} onChange={this.onChange}
                 type="password" name="password"/>
              </label>
              <label>
                Username
                <input value ={this.state.username} onChange={this.onChange}
                 type="text" name="username" />
              </label>
              <label>
                Phonenumber
                <input value ={this.state.phonenumber} onChange={this.onChange}
                 type="inputPhone" name="phonenumber"/>
              </label>
            </fieldset>
              <button id = "sign" type="submit" name="submit"
              >Register Now </button>
          </form>
        </div>
      </div>
    );
  }
}
export default SignUp;

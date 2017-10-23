import React from 'react';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';
import Header from '../components/Navbar.jsx';

/**
 * @description creates a class reset password as a react component
 * 
 * @class ResetPassword
 * 
 * @extends {React.Component}
 * 
 * @return {void}
 */
class ResetPassword extends React.Component {

/**
 * @description Creates an instance of ResetPassword.
 * 
 * @param { Object } props
 * 
 * @memberof ResetPassword
 */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: ''
    };
  }
/**
 *@description Creates an on change event method that
  * monitors the state of the component
  * 
  * @param { String } event
  * 
  * @memberof ResetPassword
  * 
  * @return { void }
  */
  onChange = (event)=> {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
/**
 * @description Creates an on submit event that fires a submit action.
 * 
 * @return { void }
 * 
 * @param { event } event
 * 
 * @memberof ResetPassword
 */
  onSubmit = (event) => {
    event.preventDefault();
    const resetEmail = {
      email: this.state.email
    };
    AppActions.resetPassword(resetEmail)
      .then(() => {
        this.props.history.push('/signin');
      })
  }

render() {
    return (
      <div>
        <Header />
        <form id="resetpassword" onSubmit={this.onSubmit}>
          <fieldset className="account-info">
            <label>
              Email Address
              <input value={this.state.email} onChange={this.onChange}
                type="email" name="email" required />
            </label>
          </fieldset>
          <button name="login" className="btn btn-primary btn-sm">
            Reset Password
          </button>
        </form>
      </div>
    );
  }
}
export default ResetPassword;

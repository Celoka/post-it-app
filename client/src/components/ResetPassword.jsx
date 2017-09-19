import React from 'react';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';
import Header from '../components/Navbar.jsx';
/**
 * @return {void}
 * @class ResetPassword
 * @extends {React.Component}
 */
class ResetPassword extends React.Component {
  /**
   * Creates an instance of ResetPassword.
   * @param {any} props
   * @memberof ResetPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * Creates an on change event method
   * @return {void}
   * @param {any} event
   * @memberof ResetPassword
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * Creates an on submit event that fires a submit action.
   * @return {void}
   * @param {any} event
   * @memberof ResetPassword
   */
  onSubmit(event) {
    event.preventDefault();
    const resetEmail = {
      email: this.state.email
    };
    AppActions.resetPassword(resetEmail)
      .then(() => {
        toastr.success('Password Reset Link sent');
        this.props.history.push('/signin');
      }).catch((error) => {
        toastr.error('Password reset unsuccessful');
        const message = error;
        this.setState({
          message
        });
      });
  }

  /**
   * @returns {void}
   * @memberof ResetPassword
   */
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
